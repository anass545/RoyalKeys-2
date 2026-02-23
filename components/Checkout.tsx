
import React, { useState } from 'react';
import { Product } from '../types';
import { supabase } from '../lib/supabase.ts';

interface CheckoutProps {
  product: Product;
  onCancel: () => void;
  onSuccess: (licenseKey: string) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ product, onCancel, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const sendEmailNotification = async (orderInfo: any) => {
    const adminEmails = ['mtcrs604@gmail.com', 'v0896980v@gmail.com'];

    try {
      console.log(`Sending purchase notifications to: ${adminEmails.join(', ')}`, orderInfo);

      const publicKey = (import.meta.env as any).VITE_EMAILJS_PUBLIC_KEY;
      if (!publicKey) {
        console.warn('EmailJS Public Key not found. Please add VITE_EMAILJS_PUBLIC_KEY to your .env');
        return;
      }

      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_default',
          template_id: 'template_purchase',
          user_id: publicKey,
          template_params: {
            ...orderInfo,
            admin_emails: adminEmails.join(', ')
          }
        })
      });

    } catch (err) {
      console.error('Failed to send email notifications:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const transactionId = `TR-${Math.random().toString(36).substring(7).toUpperCase()}`;
      const generatedKey = `${Math.random().toString(36).substring(2, 7).toUpperCase()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}-XXXX`;

      // 1. Try a FULL insert first
      let { error: insertError } = await supabase.from('orders').insert({
        product_id: product.id,
        product_title: product.title,
        product_image: product.image,
        price: product.price,
        customer_email: email,
        status: 'completed',
        payment_method: 'Stripe',
        transaction_id: transactionId,
        license_key: generatedKey
      });

      // 2. If it fails (likely due to missing columns), try a minimal insert
      if (insertError) {
        console.warn('Full insert failed, falling back to minimal schema:', insertError);
        const { error: fallbackError } = await supabase.from('orders').insert({
          product_id: product.id,
          product_title: product.title,
          price: product.price,
          customer_email: email,
          status: 'completed',
          payment_method: 'Stripe',
          transaction_id: transactionId
        });
        insertError = fallbackError;
      }

      if (insertError) {
        throw new Error(insertError.message || 'Database connection error');
      }

      // Send Email Notification to BOTH Admins
      await sendEmailNotification({
        product_title: product.title,
        price: product.price,
        customer_email: email,
        transaction_id: transactionId,
        license_key: generatedKey,
        dashboard_url: `${window.location.origin}/admin#sales`
      });

      onSuccess(generatedKey);
    } catch (err: any) {
      console.error('Submission error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl animate-in fade-in zoom-in-95 duration-300">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm font-bold flex items-center gap-3">
          <i className="fas fa-exclamation-circle text-lg"></i>
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left: Form */}
        <div className="space-y-8">
          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-[#04051a] flex items-center justify-center text-xs">1</span>
              Contact Information
            </h3>
            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email address for delivery"
                className="w-full bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-amber-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </section>

          <section>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-amber-500 text-[#04051a] flex items-center justify-center text-xs">2</span>
              Payment Method
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <button className="border-2 border-amber-500 bg-[#0a0c2e] p-4 rounded-xl flex flex-col items-center gap-2">
                <i className="fab fa-cc-visa text-2xl"></i>
                <span className="text-xs font-bold uppercase">Credit Card</span>
              </button>
              <button className="border border-gray-700 bg-[#0a0c2e] p-4 rounded-xl flex flex-col items-center gap-2 opacity-50">
                <i className="fab fa-paypal text-2xl"></i>
                <span className="text-xs font-bold uppercase">PayPal</span>
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <input type="text" placeholder="Card number" className="w-full bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-amber-500" />
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="MM/YY" className="bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-amber-500" />
                <input type="text" placeholder="CVV" className="bg-[#0a0c2e] border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-amber-500" />
              </div>
            </div>
          </section>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="px-8 py-3 rounded-lg font-bold text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 bg-amber-500 hover:bg-amber-400 text-[#04051a] font-bold py-3 rounded-lg uppercase tracking-wider transition-all disabled:opacity-50"
            >
              {loading ? <i className="fas fa-circle-notch animate-spin"></i> : `Pay $${product.price.toFixed(2)}`}
            </button>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="bg-[#0a0c2e] p-8 rounded-2xl border border-gray-800 h-fit">
          <h3 className="text-lg font-bold mb-6">Order Summary</h3>
          <div className="flex gap-4 mb-6 pb-6 border-b border-gray-800">
            <img src={product.image} className="w-20 h-20 rounded object-cover" />
            <div>
              <h4 className="font-bold text-sm line-clamp-2">{product.title}</h4>
              <p className="text-gray-400 text-xs mt-1">Instant Digital Key</p>
              <p className="text-amber-500 font-bold mt-2">${product.price.toFixed(2)}</p>
            </div>
          </div>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Platform Fee</span>
              <span>$0.00</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4 border-t border-gray-800">
              <span>Total</span>
              <span>${product.price.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-8 text-center uppercase tracking-widest">
            <i className="fas fa-lock mr-2"></i>
            Secure Checkout Guaranteed
          </p>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

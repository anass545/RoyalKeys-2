import { supabase } from './lib/supabase.ts';

async function checkOrders() {
    console.log('Checking database for orders...');
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5);

    if (error) {
        console.error('Error fetching orders:', error);
        return;
    }

    if (data && data.length > 0) {
        console.log(`Found ${data.length} orders:`);
        data.forEach((order: any, i: number) => {
            console.log(`${i + 1}. Product: ${order.product_title}, Email: ${order.customer_email}, Created: ${order.created_at}`);
        });
    } else {
        console.log('No orders found in the table.');
    }
}

checkOrders();

import { supabase } from './lib/supabase';

async function checkSchema() {
    const { data, error } = await supabase.from('orders').select('*').limit(1);
    if (error) {
        console.error('Error fetching order:', error);
    } else if (data && data[0]) {
        console.log('Available columns in orders table:', Object.keys(data[0]));
    } else {
        console.log('No orders found to determine schema.');
    }
}

checkSchema();

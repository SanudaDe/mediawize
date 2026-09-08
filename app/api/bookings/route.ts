import { NextRequest, NextResponse } from 'next/server';
import { bookingFormSchema } from '@/lib/validations';
import { createServerClient } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Validate request body with Zod
    const validationResult = bookingFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid booking data submitted',
          errors: validationResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const bookingData = validationResult.data;
    const bookingReference = `WT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Attempt to store in Supabase
    try {
      const supabase = createServerClient();
      
      const { data, error } = await supabase.from('bookings').insert([
        {
          booking_reference: bookingReference,
          client_name: bookingData.client_name,
          client_email: bookingData.client_email,
          client_phone: bookingData.client_phone,
          company_name: bookingData.company_name || null,
          show_name: bookingData.show_name || bookingData.service_interest || null,
          requested_date: bookingData.requested_date || new Date().toISOString().split('T')[0],
          requested_time_slot: bookingData.requested_time_slot || 'Flexible',
          guest_count: bookingData.guest_count || 1,
          add_ons: bookingData.add_ons || [],
          estimated_total_lkr: 0,
          client_notes: bookingData.client_notes || null,
          status: 'pending',
        },
      ]).select();

      if (error) {
        console.error('Supabase insert error:', error.message);
      } else {
        console.log('Booking successfully stored in Supabase:', data);
      }
    } catch (dbErr) {
      console.warn('Database connection note:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Studio inquiry received successfully',
      bookingReference,
      clientName: bookingData.client_name,
      requestedDate: bookingData.requested_date || 'Flexible',
    });
  } catch (err: any) {
    console.error('Booking API Error:', err);
    return NextResponse.json(
      {
        success: false,
        message: err.message || 'Internal server error while processing booking',
      },
      { status: 500 }
    );
  }
}

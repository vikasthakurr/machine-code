export const ok           = (res, data)                      => res.status(200).json({ success: true, data });
export const created      = (res, data)                      => res.status(201).json({ success: true, data });
export const badRequest   = (res, message)                   => res.status(400).json({ success: false, message });
export const unauthorized = (res, message = 'Unauthorized')  => res.status(401).json({ success: false, message });
export const notFound     = (res, message = 'Not found')     => res.status(404).json({ success: false, message });
export const serverError  = (res, message = 'Internal server error') => res.status(500).json({ success: false, message });

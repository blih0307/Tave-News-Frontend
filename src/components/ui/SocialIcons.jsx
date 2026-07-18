// Plain inline SVGs (no icon library dependency) — each accepts a
// className so callers control size/color via currentColor.

export function XIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.9 2H22l-7.1 8.1L23 22h-6.6l-5.2-6.8L5 22H2l7.6-8.7L1.3 2H8l4.7 6.2L18.9 2zm-2.3 18h1.8L7.5 4H5.6l11 16z" />
    </svg>
  )
}

export function FacebookIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.78-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.81 8.44-4.94 8.44-9.94z" />
    </svg>
  )
}

export function InstagramIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2c2.7 0 3.06.01 4.12.06 1.06.05 1.78.22 2.41.46.66.26 1.21.6 1.76 1.15.5.5.85 1.06 1.12 1.7.24.62.41 1.34.46 2.41.05 1.06.06 1.42.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.78-.46 2.41-.26.66-.6 1.21-1.15 1.76-.5.5-1.06.85-1.7 1.12-.62.24-1.34.41-2.41.46-1.06.05-1.42.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.78-.22-2.41-.46-.66-.26-1.21-.6-1.76-1.15-.5-.5-.85-1.06-1.12-1.7-.24-.62-.41-1.34-.46-2.41C2.01 15.06 2 14.7 2 12s.01-3.06.06-4.12c.05-1.06.22-1.78.46-2.41.26-.66.6-1.21 1.15-1.76.5-.5 1.06-.85 1.7-1.12.62-.24 1.34-.41 2.41-.46C8.94 2.01 9.3 2 12 2zm0 1.8c-2.66 0-2.98.01-4.03.06-.86.04-1.33.18-1.64.3-.41.16-.7.35-1.01.66-.31.31-.5.6-.66 1.01-.12.31-.26.78-.3 1.64C4.31 9.02 4.3 9.34 4.3 12s.01 2.98.06 4.03c.04.86.18 1.33.3 1.64.16.41.35.7.66 1.01.31.31.6.5 1.01.66.31.12.78.26 1.64.3 1.05.05 1.37.06 4.03.06s2.98-.01 4.03-.06c.86-.04 1.33-.18 1.64-.3.41-.16.7-.35 1.01-.66.31-.31.5-.6.66-1.01.12-.31.26-.78.3-1.64.05-1.05.06-1.37.06-4.03s-.01-2.98-.06-4.03c-.04-.86-.18-1.33-.3-1.64-.16-.41-.35-.7-.66-1.01-.31-.31-.6-.5-1.01-.66-.31-.12-.78-.26-1.64-.3C14.98 3.81 14.66 3.8 12 3.8zm0 3.5a4.7 4.7 0 110 9.4 4.7 4.7 0 010-9.4zm0 7.75a3.05 3.05 0 100-6.1 3.05 3.05 0 000 6.1zm5.98-7.93a1.1 1.1 0 11-2.2 0 1.1 1.1 0 012.2 0z" />
    </svg>
  )
}

export function YouTubeIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" />
    </svg>
  )
}

export function WhatsAppIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.6.1-.2.3-.7.9-.9 1-.2.2-.3.2-.6.1-.9-.4-1.8-1-2.6-1.8-.7-.7-1.3-1.5-1.8-2.4-.1-.3-.1-.5.1-.6.2-.2.5-.5.6-.7.1-.2.1-.4 0-.6-.1-.2-.6-1.5-.8-2-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.7.7-1 1.6-1 2.6.1 1.1.6 2.2 1.3 3.2 1.4 2 3.2 3.5 5.3 4.5 1 .5 2 .8 3.1.9.7.1 1.4-.1 2-.5.6-.4 1-1.1 1.1-1.8 0-.2 0-.5-.1-.6-.1-.1-.5-.3-.8-.4z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.7 1.5 5.2L2 22l4.9-1.3C8.3 21.5 10.1 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.2c-1.6 0-3.2-.4-4.6-1.3l-.3-.2-3.3.9.9-3.2-.2-.3C3.6 14.4 3.2 12.7 3.2 11 3.2 6.5 6.5 3.2 11 3.2c4.5 0 8.8 4.3 8.8 8.8 0 4.5-3.3 8.2-7.8 8.2z" />
    </svg>
  )
}

export function MailIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
    </svg>
  )
}

export function MapPinIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export function LinkIcon({ className = 'w-5 h-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
    </svg>
  )
}

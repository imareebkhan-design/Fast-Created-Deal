'use client'

import { motion } from 'framer-motion'
import { waLink } from '@/lib/wa'

const WA_LINK = waLink()

export default function BottomCTA() {
  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById('emi-calculator')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section style={{ backgroundColor: '#18181B', padding: '96px 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div
          className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 items-center"
        >
          <div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: 600,
                color: '#4F46E5',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '16px',
              }}
            >
              Take the first step
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 700,
                color: '#FFFFFF',
                lineHeight: 1.1,
                letterSpacing: '-0.04em',
                marginBottom: '14px',
              }}
            >
              Stop overpaying.<br />
              Start saving today.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '16px',
                color: 'rgba(255,255,255,0.45)',
                maxWidth: '440px',
                lineHeight: 1.75,
              }}
            >
              Free analysis. No paperwork. No obligation. Clarity on how much you can save — in 2 hours on WhatsApp.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.55 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            <motion.button
              onClick={scrollToForm}
              whileTap={{ scale: 0.97 }}
              style={{
                height: '48px',
                padding: '0 28px',
                background: '#FFFFFF',
                color: '#09090B',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '7px',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F4F4F5')}
              onMouseLeave={e => (e.currentTarget.style.background = '#FFFFFF')}
            >
              Calculate My Savings
            </motion.button>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.97 }}
              style={{
                height: '48px',
                padding: '0 28px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: '#25D366',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sans)',
                fontSize: '15px',
                fontWeight: 600,
                borderRadius: '7px',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.15s',
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#1DA851')}
              onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Chat on WhatsApp
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const rows = [
  { feature: 'Response after enquiry',    other: 'Hours or days',           fcd: 'Within 2 hours' },
  { feature: 'After document collection', other: 'Agent goes silent',        fcd: 'WhatsApp update every stage' },
  { feature: 'Bank selection',            other: 'Random availability',      fcd: 'Matched to your exact profile' },
  { feature: 'Specialisation',            other: 'All loan types',           fcd: 'Salaried EMI overload only' },
  { feature: 'CIBIL concerns',            other: 'Rejected, no explanation', fcd: 'Clarified before you apply' },
  { feature: 'Timeline to disbursal',     other: 'Unpredictable',            fcd: '21 days average' },
]

const ff = 'var(--font-sans)'

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.15 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      style={{
        backgroundColor: '#FFFFFF',
        padding: '96px 0',
        borderTop: '1px solid #E4E4E7',
        borderBottom: '1px solid #E4E4E7',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px' }}>
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'block', fontFamily: ff, fontSize: '11px', fontWeight: 600,
              color: '#4F46E5', textTransform: 'uppercase', letterSpacing: '0.08em',
              marginBottom: '14px',
            }}
          >
            Why Fast Credit Deal
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: ff, fontSize: 'clamp(26px, 3vw, 36px)', fontWeight: 600,
              color: '#09090B', lineHeight: 1.15, letterSpacing: '-0.03em',
              maxWidth: '560px',
            }}
          >
            Not all loan advisors<br />are built the same.
          </motion.h2>
        </div>

        {/* Table */}
        <div
          ref={ref}
          style={{
            borderRadius: '16px',
            border: '1px solid #E4E4E7',
            overflow: 'hidden',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
          }}
        >

          {/* Column headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.6fr 1.6fr' }}>

            <div style={{
              padding: '16px 24px', background: '#F4F4F5',
              borderBottom: '1px solid #E4E4E7',
              fontFamily: ff, fontSize: '11px', fontWeight: 600,
              color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Feature
            </div>

            <div style={{
              padding: '16px 24px', background: '#F4F4F5',
              borderBottom: '1px solid #E4E4E7', borderLeft: '1px solid #E4E4E7',
              fontFamily: ff, fontSize: '11px', fontWeight: 600,
              color: '#A1A1AA', textTransform: 'uppercase', letterSpacing: '0.08em',
            }}>
              Others
            </div>

            <div style={{
              padding: '16px 24px', background: '#F0F0FF',
              borderBottom: '1px solid #C7D2FE', borderLeft: '4px solid #4F46E5',
              display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap',
            }}>
              <span style={{
                fontFamily: ff, fontSize: '11px', fontWeight: 700,
                color: '#09090B', letterSpacing: '-0.01em',
              }}>
                Fast Credit Deal
              </span>
              <span style={{
                fontFamily: ff, fontSize: '10px', fontWeight: 600,
                color: '#4F46E5', background: '#EEF2FF',
                borderRadius: '99px', padding: '3px 10px',
                border: '1px solid #C7D2FE', whiteSpace: 'nowrap',
              }}>
                Recommended
              </span>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1.6fr 1.6fr',
                borderBottom: i < rows.length - 1 ? '1px solid #F4F4F5' : 'none',
              }}
            >
              {/* Feature label */}
              <div style={{
                padding: '18px 24px',
                fontFamily: ff, fontSize: '14px', fontWeight: 500,
                color: '#27272A', lineHeight: 1.5,
              }}>
                {row.feature}
              </div>

              {/* Others value */}
              <div style={{
                padding: '18px 24px', background: '#FFFFFF',
                borderLeft: '1px solid #F4F4F5',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={visible ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22, delay: i * 0.08 + 0.05 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#F4F4F5', flexShrink: 0,
                    fontFamily: ff, fontSize: '10px', fontWeight: 800, color: '#A1A1AA',
                  }}
                >
                  ✕
                </motion.span>
                <span style={{ fontFamily: ff, fontSize: '13px', color: '#A1A1AA', lineHeight: 1.5 }}>
                  {row.other}
                </span>
              </div>

              {/* FCD value */}
              <div style={{
                padding: '18px 24px', background: '#FAFAFE',
                borderLeft: '4px solid #4F46E5',
                display: 'flex', alignItems: 'center', gap: '8px',
              }}>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={visible ? { scale: 1 } : { scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 22, delay: i * 0.08 + 0.1 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: '18px', height: '18px', borderRadius: '50%',
                    background: '#ECFDF5', flexShrink: 0,
                    fontFamily: ff, fontSize: '10px', fontWeight: 800, color: '#059669',
                  }}
                >
                  ✓
                </motion.span>
                <span style={{ fontFamily: ff, fontSize: '13px', fontWeight: 600, color: '#059669', lineHeight: 1.5 }}>
                  {row.fcd}
                </span>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  )
}

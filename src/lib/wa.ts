const WA_NUMBER = process.env.NEXT_PUBLIC_WA_NUMBER ?? '918383810454'

export function waLink(message = 'Hi%2C%20I%20want%20a%20free%20EMI%20reduction%20analysis') {
  return `https://wa.me/${WA_NUMBER}?text=${message}`
}

export function waLinkWithDetails(loans: number, emi: string) {
  const msg = `Hi%2C+I+have+${loans}+loans+and+pay+${emi}+in+EMI.+I+want+a+free+savings+analysis.`
  return `https://wa.me/${WA_NUMBER}?text=${msg}`
}

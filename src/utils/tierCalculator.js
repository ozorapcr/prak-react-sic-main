export const TIERS = {
  bronze: { minPoints: 0, discount: 0, label: 'Bronze', icon: '🥉' },
  silver: { minPoints: 1000, discount: 5, label: 'Silver', icon: '🥈' },
  gold: { minPoints: 5000, discount: 10, label: 'Gold', icon: '🥇' },
  platinum: { minPoints: 10000, discount: 15, label: 'Platinum', icon: '👑' }
}

export function getTier(totalPoints) {
  if (totalPoints >= 10000) return TIERS.platinum
  if (totalPoints >= 5000) return TIERS.gold
  if (totalPoints >= 1000) return TIERS.silver
  return TIERS.bronze
}

export function calculateDiscount(totalAmount, tierDiscount) {
  const discount = (totalAmount * tierDiscount) / 100
  return Math.min(discount, totalAmount)
}

export function calculatePoints(finalAmount) {
  return Math.floor(finalAmount / 1000)
}

export function getNextTier(currentPoints) {
  const tiers = Object.values(TIERS)
  for (let i = 0; i < tiers.length; i++) {
    if (currentPoints < tiers[i].minPoints) {
      return tiers[i]
    }
  }
  return null
}

export function calculateProgress(currentPoints) {
  const currentTier = getTier(currentPoints)
  const nextTier = getNextTier(currentPoints)
  
  if (!nextTier) return 100
  
  const start = currentTier.minPoints
  const end = nextTier.minPoints
  const progress = ((currentPoints - start) / (end - start)) * 100
  
  return Math.min(Math.round(progress), 100)
}
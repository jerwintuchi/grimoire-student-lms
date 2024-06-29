export interface SubscriptionTiers {
    id: string
    name: string
    description: string
    stripePriceId: string
    price: number
}


export const SubscriptionTer : SubscriptionTiers[] = [
    {
        id: "free",
        name: "Free",
        description: "For mages who don't want to pay.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_FREE_PRICE_ID! ?? "",
        price: 0
    },
    {
        id: "academic",
        name: "Academic",
        description: 
        "Gain access to advanced spells and more. Extensive access to the spell library, monthly apprenticeships, and more.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_ACADEMIC_PRICE_ID! ?? "",
        price: 10
    },
    {
        id: "premium",
        name: "Premium",
        description: "For mages who are hungry for power. Gain access to a more powerful magic, and more. Unlimited access to the spell library, and earn runes for rank.",
        stripePriceId: process.env.NEXT_PUBLIC_STRIPE_MAGISTER_PRICE_ID! ?? "",
        price: 20
    }
]
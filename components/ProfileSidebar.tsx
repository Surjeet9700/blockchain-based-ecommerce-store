import { User, ShoppingBag, CreditCard, Settings, HelpCircle } from 'lucide-react'
import Link from 'next/link'

export function ProfileSidebar() {
  return (
    <nav className="space-y-1">
      {[
        { name: 'Profile', href: '/profile', icon: User },
        { name: 'Orders', href: '/profile/orders', icon: ShoppingBag },
        { name: 'Payment Methods', href: '/profile/payment', icon: CreditCard },
        { name: 'Settings', href: '/profile/settings', icon: Settings },
        { name: 'Help', href: '/help', icon: HelpCircle },
      ].map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        >
          <item.icon className="mr-3 h-6 w-6" aria-hidden="true" />
          {item.name}
        </Link>
      ))}
    </nav>
  )
}


import { Star, StarHalf } from 'lucide-react'

interface RatingProps {
  value: number;
  max?: number;
}

export function Rating({ value, max = 5 }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 !== 0;

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
      {[...Array(max - Math.ceil(value))].map((_, i) => (
        <Star key={`empty-${i}`} className="w-5 h-5 text-gray-300" />
      ))}
      <span className="ml-2 text-sm text-gray-600">{value.toFixed(1)}</span>
    </div>
  )
}


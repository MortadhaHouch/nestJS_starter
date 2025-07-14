import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { PaymentModal } from './PaymentModal';

interface PricingCardProps {
  name: string;
  price: number;
  period: string;
  features: string[];
  featured?: boolean;
}

export function PricingCard({
  name,
  price,
  period,
  features,
  featured,
}: PricingCardProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  return (
    <>
      <div className="relative p-6 rounded-lg border border-zinc-800">
        {featured && (
          <div className="absolute -top-2 right-4 px-3 py-1 text-sm font-medium text-white bg-black rounded-full dark:bg-white dark:text-black">
            Featured
          </div>
        )}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium">{name}</h3>
            <div className="flex items-baseline mt-2">
              <span className="text-5xl font-bold tracking-tight">
                €{price}
              </span>
              <span className="ml-1 text-sm font-medium text-zinc-400">
                /{period}
              </span>
            </div>
          </div>
          <Button className="w-full" onClick={() => setShowPaymentModal(true)}>
            Get {name}
          </Button>
          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex gap-2 items-center">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-zinc-500">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        plan={{ name, price, period }}
      />
    </>
  );
}

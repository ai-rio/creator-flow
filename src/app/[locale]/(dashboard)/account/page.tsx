import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';
import { getSession } from '@/features/account/controllers/get-session';
import { getSubscription } from '@/features/account/controllers/get-subscription';
import { PricingCard } from '@/features/pricing/components/price-card';
import { getProducts } from '@/features/pricing/controllers/get-products';
import { Price, ProductWithPrices } from '@/features/pricing/types';

export default async function AccountPage() {
  const [session, subscription, products, t] = await Promise.all([
    getSession(),
    getSubscription(),
    getProducts(),
    getTranslations('account'),
  ]);

  if (!session) {
    redirect('/login');
  }

  let userProduct: ProductWithPrices | undefined;
  let userPrice: Price | undefined;

  if (subscription) {
    for (const product of products) {
      for (const price of product.prices) {
        if (price.id === subscription.price_id) {
          userProduct = product;
          userPrice = price;
        }
      }
    }
  }

  return (
    <div className='mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-24 lg:px-8'>
      <div className='sm:align-center sm:flex sm:flex-col'>
        <h1 className='text-4xl font-extrabold text-white sm:text-center sm:text-6xl'>{t('title')}</h1>
        <p className='m-auto mt-5 max-w-2xl text-xl text-zinc-200 sm:text-center sm:text-2xl'>{t('subtitle')}</p>
      </div>
      <div className='mt-12'>
        <div className='relative mx-auto max-w-7xl'>
          <div className='mx-auto max-w-4xl text-center'>
            <p className='mt-2 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl'>
              {userProduct?.name ?? t('noSubscription')}
            </p>
          </div>
          <p className='mx-auto mt-4 max-w-2xl text-center text-xl text-zinc-200'>
            {userProduct?.description ?? t('noSubscriptionDescription')}
          </p>
          <div className='mt-12 space-y-4 sm:mt-16 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:mx-auto lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-3'>
            {userPrice && (
              <div className='divide-y divide-zinc-600 rounded-lg border border-zinc-600 shadow-sm'>
                <div className='p-6'>
                  <p className='text-lg font-medium leading-6 text-white'>{userProduct?.name}</p>
                  <p className='mt-8'>
                    <span className='text-4xl font-extrabold text-white'>${userPrice.unit_amount! / 100}</span>
                    <span className='text-base font-medium text-zinc-100'>/{userPrice.interval}</span>
                  </p>
                  <p className='mt-4 text-zinc-300'>{userProduct?.description}</p>
                  <Button asChild className='mt-8 block w-full'>
                    <Link href='/manage-subscription'>{t('manageSubscription')}</Link>
                  </Button>
                </div>
              </div>
            )}
          </div>
          {!userPrice && (
            <div className='mt-8 flex justify-center'>
              <Button asChild>
                <Link href='/pricing'>{t('choosePlan')}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

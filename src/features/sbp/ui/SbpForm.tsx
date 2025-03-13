'use client';

import { openLink } from '@telegram-apps/sdk';
import { Button, Input } from '@telegram-apps/telegram-ui';
import { useForm } from 'react-hook-form';
import { useSbpPay } from '@/shared/api/payment/sbp-pay';
import { ErrorMessage } from '@hookform/error-message';
import styles from './SbpForm.module.css';

type Inputs = {
  amount: number;
};

export default function SbpForm() {
  const { mutateAsync, error: payError, isPending, isError } = useSbpPay();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>({
    defaultValues: {
      amount: 10.0,
    },
  });

  const onSubmit = async (value: Inputs) => {
    const { amount } = value;
    console.log(amount);
    try {
      const response = await mutateAsync({
        amount: amount,
        createBinding: false,
        bindingId: null,
        hasBonuses: false,
      });
      response.data;
      console.log(openLink.isAvailable());
      if (openLink.isAvailable()) {
        openLink(response.data.payLoad);
      }
    } catch {
      console.log('error');
      setError('amount', {
        type: 'manual',
        message: `Ошибка при оплате ${payError?.message}`,
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input header="Сумма" {...register('amount', { min: 0, max: 10000 })} placeholder="10.00" />
      <div className={styles.error_container}>
        <ErrorMessage errors={errors} name="amount" />
      </div>

      <div className={styles.button_container}>
        <Button loading={isPending} type="submit" mode="filled" size="l" stretched>
          Оплатить
        </Button>
      </div>
    </form>
  );
}

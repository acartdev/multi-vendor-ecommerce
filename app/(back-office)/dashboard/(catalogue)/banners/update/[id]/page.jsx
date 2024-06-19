import FormHeader from '@/components/backoffice/FormHeader'
import BannersForm from '@/components/backoffice/form/BannerForm'
import { getData } from '@/lib/getData';
import React from 'react'

export default async function UpdateBanners({ params: { id } }) {
  const banner = await getData(`/banners/${id}`);
  return (
    <div>
      <FormHeader title="Update Banner" />
      <BannersForm updateData={banner}/>
    </div>
  )
}

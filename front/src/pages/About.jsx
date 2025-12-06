import React from 'react'
import Title from '../components/Title'
import NewsletterBox from '../components/NewsletterBox'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Forever started with a simple idea: fashion should be fun, affordable, and accessible to everyone. Since our launch, we&apos;ve grown into a trusted destination for stylish clothing that doesn&apos;t compromise on quality or your budget.</p>
          <p>We curate the latest trends and timeless classics for men, women, and kids, partnering with reliable manufacturers to bring you great styles at prices you&apos;ll love. Every piece is selected with care to ensure you look good and feel confident.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p>Our mission is to make fashion accessible for everyone. We&apos;re committed to offering stylish, quality clothing at affordable prices with fast shipping, so you can refresh your wardrobe without the wait or the worry.</p>
        </div>
      </div>
      <div className='text-xl py-4 '>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='boder px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>We carefully select every item in our collection to ensure it meets our standards for quality and style. Each product is inspected and tested so you can shop with confidence.</p>
        </div>
        <div className='boder px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>We carefully select every item in our collection to ensure it meets our standards for quality and style. Each product is inspected and tested so you can shop with confidence.</p>
        </div>
        <div className='boder px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>We carefully select every item in our collection to ensure it meets our standards for quality and style. Each product is inspected and tested so you can shop with confidence.</p>
        </div>
      </div>

      <NewsletterBox />

    </div>
  )
}

export default About
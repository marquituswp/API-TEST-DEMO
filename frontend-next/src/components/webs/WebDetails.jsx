"use client"
import Carousel from "@/lib/swiper"
import HandlePoints from "@/components/webs/Rating"
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
export default function WebDetails({ web }) {
  const {token} = useAuth()
  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <Link href="/" className="text-indigo-500 font-medium text-lg mb-4 block">Back to webs</Link>
        <div className=" mb-6">
          <Carousel images={web.images} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">{web.city}</h1>
            <p className="text-lg text-gray-600 mb-12">Activity: {web.activity}</p>
            <div className="text-lg text-gray-500 flex items-center mt-12">
              <HandlePoints points={web.points} />
            </div>
            {token && <div className="btn mt-8">
              <Link href={`/web/${web._id}/leaveReview`}>Leave a review</Link>
            </div>}
          </div>

          <div className="space-y-4 h-96 overflow-y-auto">
            <h2 className="text-2xl font-semibold text-gray-800">Reviews</h2>
            <ul className="space-y-4">
              {web.reviews.map((review, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold text-gray-800">{review.review}</h3>
                  <p className="text-gray-600 mt-2">{review.scoring}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
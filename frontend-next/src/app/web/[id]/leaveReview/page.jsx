import React from 'react';
import ReviewForm from '@/components/webs/ReviewForm';
export default async function LeaveReviewPage({params}) {
    const { id } = await params;
    return (
        <div>
            <ReviewForm webId={id}/>
        </div>
    );
}
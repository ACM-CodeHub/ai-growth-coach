import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import api from "../services/api";

function PeerReview() {

    const user = JSON.parse(localStorage.getItem("user"));
    const reviewerId = user?.id;

    const [submissions, setSubmissions] = useState([]);
    const [submissionId, setSubmissionId] = useState("");

    const [score, setScore] = useState(5);
    const [comment, setComment] = useState("");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);


    // Fetch submissions
    const fetchSubmissions = async () => {
        try {
            const response = await api.get("/submissions/");
            setSubmissions(response.data);
        }
        catch(error) {
            console.log(
                error.response?.data || error
            );
        }
    };


    // Fetch previous reviews
    const fetchReviews = async () => {

        if(!submissionId) {
            setReviews([]);
            return;
        }

        try {

            const response = await api.get(
                `/peer-reviews/${submissionId}`
            );

            setReviews(
                response.data.reviews || []
            );

        }
        catch(error) {

            console.log(
                error.response?.data || error
            );

            setReviews([]);
        }
    };


    useEffect(() => {
        fetchSubmissions();
    }, []);


    useEffect(() => {
        fetchReviews();
    }, [submissionId]);



    // Submit Review
    const submitReview = async () => {


        if(!submissionId) {
            alert(
                "No submission selected for review"
            );
            return;
        }


        if(!reviewerId) {
            alert(
                "Please login first"
            );
            return;
        }


        if(comment.trim() === "") {
            alert(
                "Please write feedback"
            );
            return;
        }


        try {

            setLoading(true);


            const response = await api.post(
                "/peer-reviews/",
                {
                    submission_id: submissionId,
                    reviewer_id: reviewerId,
                    score: Number(score),
                    comment: comment
                }
            );


            console.log(response.data);


            alert(
                "Review submitted successfully"
            );


            setComment("");
            setScore(5);


            // Refresh reviews after submission
            fetchReviews();


        }
        catch(error) {

            console.log(
                error.response?.data || error
            );


            alert(
                "Failed to submit review"
            );

        }
        finally {

            setLoading(false);

        }

    };



return (

<DashboardLayout>

<div className="dashboard">


    <div className="dashboard-header">

        <div>

            <h1>
                👥 Peer Review
            </h1>

            <p>
                Review submissions and provide constructive feedback.
            </p>

        </div>

    </div>



    <div className="profile-card peer-card">

        <h2>
            Select Submission
        </h2>


        <select
        className="peer-select"
        value={submissionId}
        onChange={(e)=>
            setSubmissionId(e.target.value)
        }
        >


        <option value="">
            Select submission
        </option>


        {
            submissions.map((item)=>(

            <option
            key={item.id}
            value={item.id}
            >

            {item.title} ({item.language})

            </option>

            ))

        }


        </select>


    </div>




    <div className="profile-card peer-card">


        <h2>
            ✍️ Write Review
        </h2>



        <div className="rating">


        {
            [1,2,3,4,5].map((star)=>(


            <span

            key={star}

            onClick={()=>
                setScore(star)
            }


            className={
                star <= score
                ?
                "selected-star"
                :
                ""
            }

            >

            ★

            </span>


            ))

        }


        </div>



        <textarea

        className="peer-textarea"

        placeholder="Write your feedback..."

        value={comment}

        onChange={(e)=>
            setComment(e.target.value)
        }

        />



        <button

        className="primary-btn"

        onClick={submitReview}

        disabled={loading}

        >

        {
            loading
            ?
            "Submitting..."
            :
            "Submit Review"
        }


        </button>



    </div>





    <div className="profile-card peer-card">


        <h2>
            💬 Previous Reviews
        </h2>



        {
            reviews.length === 0

            ?

            <p className="empty-text">
                No reviews yet.
            </p>


            :


            reviews.map((review)=>(


            <div

            className="review-box"

            key={review.id}

            >


            <div className="review-score">

            ⭐ {review.score}/5

            </div>



            <p>

            {review.comment}

            </p>



            <small>

            {
                new Date(
                    review.created_at
                ).toLocaleDateString()
            }

            </small>



            </div>


            ))

        }



    </div>



</div>


</DashboardLayout>


);

}


export default PeerReview;
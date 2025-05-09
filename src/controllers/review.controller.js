export async function getReviews(req, res, next) {
  const response = await fetch("https://silvercoco.ca/wp-json/wp/v2/dits-review?acf_format=standard");
  const responseData = await response.json();
  if (response.ok) {
    return res.status(200).json({
      message: `${responseData.length} DITSReview entries retrieved successfully`,
      data: responseData.map((review) => ({
        id: review.id,
        name: review.title.rendered,
        content: review.acf.review_content,
        type: review.acf.review_type,
        icon: review.acf.review_icon,
      })),
    });
  }

  next({
    status: response.status,
    title: "Failed to fetch",
    message:
      "An error occurred while fetching D.I.T.S. review data. Please try again. If the issue persists, please contact us at hello@silvercoco.ca",
  });
}

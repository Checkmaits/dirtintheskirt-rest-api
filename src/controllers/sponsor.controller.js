export async function getSponsors(req, res, next) {
  const response = await fetch("https://silvercoco.ca/wp-json/wp/v2/dits-sponsor?acf_format=standard");
  const responseData = await response.json();
  if (response.ok) {
    return res.status(200).json({
      message: `${responseData.length} DITSSponsor entries retrieved successfully`,
      data: responseData.map((sponsor) => ({
        id: sponsor.id,
        brand: sponsor.title.rendered,
        logo: sponsor.acf.sponsor_image,
        team: sponsor.acf.team_name,
        teamLogo: sponsor.acf.team_logo,
      })),
    });
  }

  next({
    status: response.status,
    title: "Failed to fetch",
    message:
      "An error occurred while fetching D.I.T.S. sponsor data. Please try again. If the issue persists, please contact us at hello@silvercoco.ca",
  });
}

export async function getSponsorshipDeck(req, res, next) {
  const response = await fetch("https://silvercoco.ca/wp-json/wp/v2/dits-sponsorship-dec?acf_format=standard");
  const responseData = await response.json();
  if (response.ok) {
    return res.status(200).json({
      message: `${responseData.length} DITSSponsorshipDeck entries retrieved successfully`,
      data: responseData.map((sponsor) => ({
        id: sponsor.id,
        pdfFile: sponsor.acf.pdf_file,
      })),
    });
  }

  next({
    status: response.status,
    title: "Failed to fetch",
    message:
      "An error occurred while fetching D.I.T.S. sponsorship deck data. Please try again. If the issue persists, please contact us at hello@silvercoco.ca",
  });
}

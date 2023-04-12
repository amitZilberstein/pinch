export default (data) => {
	if (data.activate_blog_and_articles_pages === false) {
		[...document.querySelectorAll('.is-blog-link')].map(linkEl => linkEl.style.display = 'none');
	}
	if (data.activate_featured_creators_page === false) {
		[...document.querySelectorAll('.is-featured-link')].map(linkEl => linkEl.style.display = 'none');
	}
	if (data.activate_for_creators_page === false) {
		[...document.querySelectorAll('.is-for-creators-link')].map(linkEl => linkEl.style.display = 'none');
	}
	if (data.activate_faq_page === false) {
		[...document.querySelectorAll('.is-faq-link')].map(linkEl => linkEl.style.display = 'none');
	}
}
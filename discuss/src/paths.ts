const paths = {
  home() {
    return "/";
  },
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/post/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/post/${postId}`;
  },
};

export default paths;

import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';

// True when `post` is the discussion's opening post (so it should NOT get the
// "OP" badge — the badge marks the original poster's *replies*).
function isFirstPost(post: any): boolean {
  try {
    const discussion = post.discussion();
    const firstPost = discussion && discussion.firstPost && discussion.firstPost();
    if (firstPost && firstPost.id) {
      return firstPost.id() === post.id();
    }
    if (typeof post.number === 'function') {
      return post.number() === 1;
    }
  } catch (e) {
    console.warn('[linkrobins/op] isFirstPost error:', e);
  }
  return false;
}

app.initializers.add('linkrobins-op', () => {
  // String-path form so the override applies whether PostUser is in an eager or
  // lazy-loaded chunk (replaces the old flarum.reg.get() registry lookups).
  extend('flarum/forum/components/PostUser', 'view', function (this: any, vnode: any) {
    try {
      const routeName = app.current && app.current.get && app.current.get('routeName');
      if (routeName !== 'discussion' && routeName !== 'discussion.near') return;

      const post = this.attrs && this.attrs.post;
      if (!post) return;

      const postUser = post.user && post.user();
      if (!postUser || !postUser.id) return;

      const discussion = post.discussion && post.discussion();
      if (!discussion) return;

      const discUser = discussion.user && discussion.user();
      if (!discUser || !discUser.id) return;

      // Only badge posts written by the discussion's original author...
      if (postUser.id() !== discUser.id()) return;

      // ...and never the opening post itself.
      if (isFirstPost(post)) return;

      if (!vnode || !vnode.children) return;
      vnode.children.push(
        m('span', { className: 'LinkRobinsOp-badge' }, app.translator.trans('linkrobins-op.forum.label'))
      );
    } catch (e) {
      console.error('[linkrobins/op] view extension error:', e);
    }
  });
});

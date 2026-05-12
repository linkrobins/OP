'use strict';

(function () {

    function isFirstPost(post) {
        try {
            var discussion = post.discussion();
            var firstPost  = discussion && discussion.firstPost && discussion.firstPost();
            if (firstPost && firstPost.id) {
                return firstPost.id() === post.id();
            }
            if (typeof post.number === 'function') {
                return post.number() === 1;
            }
        } catch (e) {}
        return false;
    }

    function init() {
        var PostUser = null;
        var extMod   = null;
        try { PostUser = flarum.reg.get('core', 'forum/components/PostUser'); } catch (e) {}
        try { extMod   = flarum.reg.get('core', 'common/extend'); } catch (e) {}

        if (!PostUser || !extMod || typeof extMod.extend !== 'function') {
            console.warn('[linkrobins/op] PostUser or extend helper not available; skipping.');
            return;
        }

        extMod.extend(PostUser.prototype, 'view', function (vnode) {
            try {
                var routeName = app.current && app.current.get && app.current.get('routeName');
                if (routeName !== 'discussion' && routeName !== 'discussion.near') return;

                var post = this.attrs && this.attrs.post;
                if (!post) return;

                var postUser = post.user && post.user();
                if (!postUser || !postUser.id) return;

                var discussion = post.discussion && post.discussion();
                if (!discussion) return;

                var discUser = discussion.user && discussion.user();
                if (!discUser || !discUser.id) return;

                if (postUser.id() !== discUser.id()) return;

                if (isFirstPost(post)) return;

                if (!vnode || !vnode.children) return;
                vnode.children.push(
                    m('span', { className: 'LinkRobinsOp-badge' },
                        app.translator.trans('linkrobins-op.forum.label'))
                );
            } catch (e) {
                console.error('[linkrobins/op] view extension error:', e);
            }
        });
    }

    if (typeof app !== 'undefined' && app.initializers && typeof app.initializers.add === 'function') {
        app.initializers.add('linkrobins-op', init);
    }

})();

module.exports = {};

<?php

/*
 * This file is part of linkrobins/op.
 *
 * For detailed copyright and license information, please view the
 * LICENSE file that was distributed with this source code.
 */

namespace LinkRobins\Op\Tests\integration;

use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;

/**
 * The extension is front-end only; its PHP side is its locale strings and the assets the
 * forum compiles. These run weekly against the newest Flarum 2.x, so a core
 * change that breaks either fails here first.
 */
class ForumTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();

        $this->extension('linkrobins-op');
    }

    /** @return array<string, mixed> */
    private function forumAttributes(): array
    {
        $response = $this->send($this->request('GET', '/api'));
        $this->assertEquals(200, $response->getStatusCode());

        return json_decode($response->getBody()->getContents(), true)['data']['attributes'];
    }

    #[Test]
    public function the_forum_page_loads_with_the_extension_enabled(): void
    {
        // Rendering the forum compiles the extension's JS and LESS into the
        // forum assets; a stylesheet that does not compile fails the page.
        $response = $this->send($this->request('GET', '/'));

        $this->assertEquals(200, $response->getStatusCode());
    }

    #[Test]
    public function the_api_answers_with_the_extension_enabled(): void
    {
        // No settings of its own; the forum payload must still build.
        $this->assertArrayHasKey('title', $this->forumAttributes());
    }
}

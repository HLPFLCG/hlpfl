import { DatabaseService } from '../utils/database';

/**
 * Post Scheduler Service
 * Handles scheduling and publishing of posts
 */

export class SchedulerService {
  constructor(private db: DatabaseService) {}

  /**
   * Get posts that are ready to be published
   */
  async getPostsToPublish(): Promise<any[]> {
    const now = new Date().toISOString();

    const posts = await this.db.queryAll(
      `SELECT p.*, u.id as user_id
       FROM posts p
       JOIN users u ON p.user_id = u.id
       WHERE p.status = 'scheduled'
       AND p.scheduled_for <= ?
       ORDER BY p.scheduled_for ASC`,
      [now]
    );

    return posts;
  }

  /**
   * Process scheduled posts
   */
  async processScheduledPosts(): Promise<void> {
    const posts = await this.getPostsToPublish();

    for (const post of posts) {
      try {
        await this.publishPost(post);
      } catch (error) {
        console.error(`Failed to publish post ${post.id}:`, error);
        
        // Mark as failed
        await this.db.execute(
          `UPDATE posts SET status = 'failed', error_message = ?, updated_at = ? WHERE id = ?`,
          [error instanceof Error ? error.message : 'Unknown error', this.db.getCurrentTimestamp(), post.id]
        );
      }
    }
  }

  /**
   * Publish a single post to all platforms
   */
  async publishPost(post: any): Promise<void> {
    const platforms = JSON.parse(post.platforms);
    const now = this.db.getCurrentTimestamp();

    // Get user's connected social accounts
    const accounts = await this.db.queryAll(
      `SELECT * FROM social_accounts WHERE user_id = ? AND status = 'active'`,
      [post.user_id]
    );

    const accountMap = new Map(accounts.map((acc: any) => [acc.platform, acc]));

    // Publish to each platform
    for (const platform of platforms) {
      const account = accountMap.get(platform);
      
      if (!account) {
        console.warn(`No active account found for platform: ${platform}`);
        continue;
      }

      try {
        // TODO: Call actual platform API
        await this.publishToPlatform(post, platform, account);
        
        console.log(`Published post ${post.id} to ${platform}`);
      } catch (error) {
        console.error(`Failed to publish to ${platform}:`, error);
      }
    }

    // Update post status
    await this.db.execute(
      `UPDATE posts SET status = 'published', published_at = ?, updated_at = ? WHERE id = ?`,
      [now, now, post.id]
    );
  }

  /**
   * Publish to a specific platform
   */
  private async publishToPlatform(post: any, platform: string, account: any): Promise<void> {
    // TODO: Implement actual platform publishing
    console.log(`Publishing to ${platform}:`, {
      postId: post.id,
      content: post.content,
      accountId: account.id,
    });

    // This would call the appropriate platform service
    // e.g., twitterService.createTweet(), linkedInService.createPost(), etc.
  }

  /**
   * Cancel a scheduled post
   */
  async cancelScheduledPost(postId: string): Promise<void> {
    await this.db.execute(
      `UPDATE posts SET status = 'draft', scheduled_for = NULL, updated_at = ? WHERE id = ? AND status = 'scheduled'`,
      [this.db.getCurrentTimestamp(), postId]
    );
  }

  /**
   * Reschedule a post
   */
  async reschedulePost(postId: string, newTime: string): Promise<void> {
    if (new Date(newTime) <= new Date()) {
      throw new Error('Scheduled time must be in the future');
    }

    await this.db.execute(
      `UPDATE posts SET scheduled_for = ?, updated_at = ? WHERE id = ? AND status = 'scheduled'`,
      [newTime, this.db.getCurrentTimestamp(), postId]
    );
  }
}
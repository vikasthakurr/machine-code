import mongoose from "mongoose";
import { env } from "./config/env.js";
import { Problem } from "./models/problem.model.js";

const problems = [
  // ─── DSA Problems ────────────────────────────────────────────────────
  {
    title: "Two Sum",
    slug: "two-sum",
    type: "dsa",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers that add up to \`target\`.

You may assume that each input has exactly one solution, and you may not use the same element twice.

**Input Format:**
- First line: space-separated integers (the array)
- Second line: the target integer

**Output Format:**
- Two space-separated indices (0-indexed)

**Example:**
\`\`\`
Input:
2 7 11 15
9

Output:
0 1
\`\`\`

**Constraints:**
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9`,
    difficulty: "easy",
    tags: ["arrays", "hash-map"],
    testCases: [
      { input: "2 7 11 15\n9", expectedOutput: "0 1" },
      { input: "3 2 4\n6", expectedOutput: "1 2" },
      { input: "3 3\n6", expectedOutput: "0 1" },
    ],
    isPublished: true,
  },
  {
    title: "Valid Parentheses",
    slug: "valid-parentheses",
    type: "dsa",
    description: `Given a string \`s\` containing just the characters \`(\`, \`)\`, \`{\`, \`}\`, \`[\`, and \`]\`, determine if the input string is valid.

**Input Format:**
- A single string of brackets

**Output Format:**
- \`true\` or \`false\`

**Constraints:**
- 1 <= s.length <= 10^4`,
    difficulty: "easy",
    tags: ["stack", "strings"],
    testCases: [
      { input: "()[]{}", expectedOutput: "true" },
      { input: "(]", expectedOutput: "false" },
      { input: "([)]", expectedOutput: "false" },
      { input: "{[]}", expectedOutput: "true" },
    ],
    isPublished: true,
  },
  {
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-without-repeating",
    type: "dsa",
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.

**Input Format:**
- A single string

**Output Format:**
- An integer (the length)

**Constraints:**
- 0 <= s.length <= 5 * 10^4`,
    difficulty: "medium",
    tags: ["sliding-window", "hash-map", "strings"],
    testCases: [
      { input: "abcabcbb", expectedOutput: "3" },
      { input: "bbbbb", expectedOutput: "1" },
      { input: "pwwkew", expectedOutput: "3" },
      { input: "", expectedOutput: "0" },
    ],
    isPublished: true,
  },
  {
    title: "Merge K Sorted Lists",
    slug: "merge-k-sorted-lists",
    type: "dsa",
    description: `You are given an array of \`k\` sorted linked lists. Merge all into one sorted list.

**Input Format:**
- First line: number of lists \`k\`
- Next \`k\` lines: space-separated sorted integers

**Output Format:**
- Space-separated integers of the merged sorted list

**Constraints:**
- 0 <= k <= 10^4
- -10^4 <= node value <= 10^4`,
    difficulty: "hard",
    tags: ["heap", "linked-list", "divide-and-conquer"],
    testCases: [
      { input: "3\n1 4 5\n1 3 4\n2 6", expectedOutput: "1 1 2 3 4 4 5 6" },
      { input: "1\n1 2 3", expectedOutput: "1 2 3" },
      { input: "0\n", expectedOutput: "" },
    ],
    isPublished: true,
  },
  {
    title: "LRU Cache",
    slug: "lru-cache",
    type: "dsa",
    description: `Implement LRU Cache with PUT and GET operations.

**Input Format:**
- First line: capacity
- Following lines: \`PUT key value\` or \`GET key\`

**Output Format:**
- For each GET, print the value or -1

**Constraints:**
- 1 <= capacity <= 3000`,
    difficulty: "medium",
    tags: ["hash-map", "linked-list", "design"],
    testCases: [
      {
        input: "2\nPUT 1 1\nPUT 2 2\nGET 1\nPUT 3 3\nGET 2\nGET 3",
        expectedOutput: "1\n-1\n3",
      },
      {
        input: "1\nPUT 1 10\nGET 1\nPUT 2 20\nGET 1\nGET 2",
        expectedOutput: "10\n-1\n20",
      },
    ],
    isPublished: true,
  },
  {
    title: "Binary Tree Level Order Traversal",
    slug: "binary-tree-level-order",
    type: "dsa",
    description: `Given a binary tree in level-order array form, return its BFS traversal level by level.

**Input Format:**
- Space-separated values (use "null" for missing nodes)

**Output Format:**
- Each level on a new line, values space-separated`,
    difficulty: "medium",
    tags: ["trees", "bfs", "queue"],
    testCases: [
      { input: "3 9 20 null null 15 7", expectedOutput: "3\n9 20\n15 7" },
      { input: "1", expectedOutput: "1" },
    ],
    isPublished: true,
  },

  // ─── Machine Coding Problems ─────────────────────────────────────────
  {
    title: "Design a URL Shortener",
    slug: "design-url-shortener",
    type: "machine-coding",
    description: `Implement a URL shortening service. Read commands from stdin:

- \`SHORTEN <url>\` — Generate a 6-char code, print it
- \`RESOLVE <code>\` — Print original URL or "NOT_FOUND"
- \`COUNT <code>\` — Print resolve count

Same URL = same code. RESOLVE increments count.`,
    difficulty: "medium",
    tags: ["system-design", "hash-map", "machine-coding"],
    testCases: [],
    isPublished: true,
  },
  {
    title: "Design an In-Memory Key-Value Store",
    slug: "design-key-value-store",
    type: "machine-coding",
    description: `Implement a KV store with TTL. Commands: SET, GET, DEL, KEYS, EXPIRE, TTL. Time advances 1 second per command.`,
    difficulty: "medium",
    tags: ["system-design", "hash-map", "machine-coding", "ttl"],
    testCases: [
      {
        input: "SET name alice\nGET name\nDEL name\nGET name",
        expectedOutput: "OK\nalice\n1\nNULL",
      },
      {
        input: "SET a 1 2\nGET a\nGET a\nGET a",
        expectedOutput: "OK\n1\n1\nNULL",
      },
    ],
    isPublished: true,
  },
  {
    title: "Design a Task Scheduler",
    slug: "design-task-scheduler",
    type: "machine-coding",
    description: `Implement a task scheduler with priorities and dependencies. Commands: ADD, RUN, STATUS, LIST.`,
    difficulty: "hard",
    tags: ["system-design", "heap", "graph", "machine-coding"],
    testCases: [
      {
        input: "ADD t1 5\nADD t2 10\nRUN\nRUN\nSTATUS t1\nSTATUS t2",
        expectedOutput: "ADDED\nADDED\nt2\nt1\nCOMPLETED\nCOMPLETED",
      },
      { input: "RUN", expectedOutput: "EMPTY" },
    ],
    isPublished: true,
  },
  {
    title: "Design a Rate Limiter",
    slug: "design-rate-limiter",
    type: "machine-coding",
    description: `Implement a sliding window rate limiter. Commands: CONFIGURE, REQUEST, COUNT, RESET.`,
    difficulty: "medium",
    tags: ["system-design", "sliding-window", "machine-coding"],
    testCases: [
      {
        input:
          "CONFIGURE 2 10\nREQUEST u1 1\nREQUEST u1 5\nREQUEST u1 8\nREQUEST u1 12\nCOUNT u1 12",
        expectedOutput: "OK\nALLOWED\nALLOWED\nDENIED\nALLOWED\n2",
      },
    ],
    isPublished: true,
  },

  // ─── HLD (High-Level Design) Problems ────────────────────────────────
  {
    title: "Design Twitter",
    slug: "design-twitter",
    type: "hld",
    description: `Design a simplified Twitter-like social media platform.

**Requirements:**
- Users can post tweets (text, max 280 chars)
- Users can follow/unfollow other users
- Users see a home timeline (tweets from people they follow, reverse chronological)
- Tweets can be liked and retweeted
- Users can search tweets by keyword

**Design Considerations:**
- How would you handle millions of users?
- How would you build the home timeline efficiently?
- What happens when a celebrity with 10M followers posts?
- How do you handle eventual consistency?

**Expected Deliverables:**
1. Architecture diagram showing all major components
2. Database schema design (what tables/collections, indexes)
3. API design (key endpoints)
4. Explanation of feed generation strategy (fan-out on write vs read)
5. Caching strategy`,
    difficulty: "hard",
    tags: ["hld", "system-design", "distributed-systems", "caching", "feed"],
    rubric: [
      {
        criterion: "Architecture Diagram",
        maxScore: 10,
        description:
          "Clear diagram with all major components (API servers, DB, cache, queue, CDN)",
      },
      {
        criterion: "Database Design",
        maxScore: 10,
        description:
          "Appropriate choice of SQL vs NoSQL, proper schema, indexing strategy",
      },
      {
        criterion: "API Design",
        maxScore: 8,
        description: "RESTful endpoints, pagination, proper auth flow",
      },
      {
        criterion: "Feed Generation",
        maxScore: 12,
        description:
          "Fan-out strategy, handling celebrity users, pre-computation vs on-demand",
      },
      {
        criterion: "Scalability",
        maxScore: 10,
        description: "Horizontal scaling, sharding, partitioning strategy",
      },
      {
        criterion: "Caching",
        maxScore: 8,
        description:
          "Cache layers (CDN, Redis), cache invalidation, hot/cold data",
      },
      {
        criterion: "Trade-offs Discussion",
        maxScore: 7,
        description: "Acknowledges trade-offs and explains choices",
      },
    ],
    requirements: [
      "Handle 500M users, 200M DAU",
      "Average user follows 200 people",
      "Timeline loads in < 200ms",
      "100K tweets per second at peak",
      "Media storage for images/videos",
    ],
    hints: [
      "Think about fan-out on write vs fan-out on read for timeline generation",
      "Consider separate read and write paths",
      "Celebrity users may need special treatment",
      "Think about what data to cache and where",
    ],
    isPublished: true,
  },
  {
    title: "Design a Chat Application (WhatsApp)",
    slug: "design-chat-application",
    type: "hld",
    description: `Design a real-time messaging system similar to WhatsApp.

**Requirements:**
- 1-on-1 messaging with real-time delivery
- Group chats (up to 256 members)
- Message delivery status (sent, delivered, read)
- Offline message storage and sync
- Media sharing (images, videos, documents)
- End-to-end encryption

**Design Considerations:**
- How do you maintain persistent connections?
- How do you handle users on different servers?
- What protocol for real-time communication?
- How do you ensure message ordering?
- How do you handle the user being offline?

**Expected Deliverables:**
1. Architecture diagram
2. Protocol choice and justification (WebSocket, MQTT, etc.)
3. Message storage and delivery flow
4. Group messaging architecture
5. Presence/online status system`,
    difficulty: "hard",
    tags: ["hld", "system-design", "real-time", "websocket", "messaging"],
    rubric: [
      {
        criterion: "Architecture Diagram",
        maxScore: 10,
        description:
          "Shows connection servers, message queue, storage, presence service",
      },
      {
        criterion: "Real-time Protocol",
        maxScore: 10,
        description:
          "WebSocket/MQTT choice justified, connection management explained",
      },
      {
        criterion: "Message Delivery Flow",
        maxScore: 12,
        description: "Complete flow: send → store → deliver → acknowledge",
      },
      {
        criterion: "Offline Handling",
        maxScore: 8,
        description: "Message queuing, sync on reconnect, push notifications",
      },
      {
        criterion: "Group Messaging",
        maxScore: 8,
        description:
          "Fan-out to group members, ordering, large group optimization",
      },
      {
        criterion: "Storage Design",
        maxScore: 7,
        description: "Message storage, media handling, retention policies",
      },
      {
        criterion: "Scalability",
        maxScore: 10,
        description:
          "Connection server scaling, consistent hashing, geographic distribution",
      },
    ],
    requirements: [
      "2B total users, 500M DAU",
      "100B messages per day",
      "Message delivery < 100ms (same region)",
      "Support 256-person groups",
      "Offline sync within 30 seconds of reconnection",
    ],
    hints: [
      "Each user needs a persistent connection — how do you route messages to the right server?",
      "Consider a message queue between sender and receiver connection servers",
      "How do you handle ordering in group messages?",
      "Think about what metadata to store vs message content",
    ],
    isPublished: true,
  },
  {
    title: "Design a URL Shortener (System Level)",
    slug: "design-url-shortener-hld",
    type: "hld",
    description: `Design a URL shortening service like Bitly at scale.

**Requirements:**
- Shorten long URLs to short codes
- Redirect short URLs to original with minimal latency
- Custom short URLs (optional feature)
- Analytics: click count, geographic data, referrer
- URL expiration (optional TTL)

**Design Considerations:**
- How do you generate unique short codes?
- How do you handle 1000 shortens/second?
- How do you ensure redirects are fast (<10ms)?
- How do you prevent abuse/spam?

**Expected Deliverables:**
1. Architecture diagram
2. Short code generation strategy
3. Database design
4. Redirect flow (optimized for latency)
5. Analytics pipeline`,
    difficulty: "medium",
    tags: ["hld", "system-design", "caching", "databases"],
    rubric: [
      {
        criterion: "Architecture Diagram",
        maxScore: 10,
        description: "API servers, DB, cache layer, analytics pipeline",
      },
      {
        criterion: "Code Generation",
        maxScore: 10,
        description:
          "Base62, counter-based, hash-based approaches with collision handling",
      },
      {
        criterion: "Database Design",
        maxScore: 8,
        description: "Schema, indexing, SQL vs NoSQL choice",
      },
      {
        criterion: "Redirect Performance",
        maxScore: 10,
        description: "Cache-first approach, CDN, 301 vs 302 discussion",
      },
      {
        criterion: "Analytics",
        maxScore: 7,
        description: "Async processing, time-series data, aggregation strategy",
      },
      {
        criterion: "Scalability & Availability",
        maxScore: 8,
        description: "Replication, partitioning, failover strategy",
      },
    ],
    requirements: [
      "100M URLs created per month",
      "10:1 read-to-write ratio",
      "Redirect latency < 10ms at p99",
      "99.99% availability",
      "Short URLs max 7 characters",
    ],
    hints: [
      "Base62 encoding gives you 62^7 ≈ 3.5 trillion unique URLs",
      "Pre-generate short codes vs generate on demand?",
      "Caching is key for redirect performance",
      "Consider separating read and write paths",
    ],
    isPublished: true,
  },
  {
    title: "Design a Notification System",
    slug: "design-notification-system",
    type: "hld",
    description: `Design a notification delivery system that supports multiple channels.

**Requirements:**
- Push notifications (iOS, Android)
- Email notifications
- SMS notifications
- In-app notifications
- User notification preferences (opt-in/out per channel)
- Rate limiting (don't spam users)
- Priority levels (critical, high, normal, low)
- Template system for notification content

**Design Considerations:**
- How do you handle millions of notifications per minute?
- How do you ensure delivery across unreliable channels?
- How do you prevent notification fatigue?
- How do you support A/B testing notification content?

**Expected Deliverables:**
1. Architecture diagram showing the full pipeline
2. Event ingestion and routing logic
3. Delivery guarantees per channel
4. Rate limiting and deduplication
5. User preference management`,
    difficulty: "medium",
    tags: [
      "hld",
      "system-design",
      "event-driven",
      "queues",
      "distributed-systems",
    ],
    rubric: [
      {
        criterion: "Architecture Diagram",
        maxScore: 10,
        description: "Event source → router → channel adapters → delivery",
      },
      {
        criterion: "Event Pipeline",
        maxScore: 10,
        description: "Ingestion, deduplication, priority queuing",
      },
      {
        criterion: "Multi-Channel Delivery",
        maxScore: 8,
        description: "Adapters for push/email/SMS, retry logic per channel",
      },
      {
        criterion: "User Preferences",
        maxScore: 7,
        description: "Preference storage, channel selection logic, quiet hours",
      },
      {
        criterion: "Rate Limiting",
        maxScore: 8,
        description: "Per-user, per-channel, global rate limits",
      },
      {
        criterion: "Reliability",
        maxScore: 7,
        description: "At-least-once delivery, DLQ, monitoring/alerting",
      },
      {
        criterion: "Scalability",
        maxScore: 8,
        description: "Horizontal scaling of workers, partitioning by user",
      },
    ],
    requirements: [
      "10M notifications per hour at peak",
      "Push notification delivery < 5 seconds",
      "Email within 1 minute",
      "99.9% delivery rate for critical notifications",
      "Support 100M users with individual preferences",
    ],
    hints: [
      "Think of it as a pipeline: Event → Validate → Route → Deliver → Track",
      "Different channels have very different latency and reliability characteristics",
      "Consider a priority queue — critical alerts skip the line",
      "Idempotency keys prevent duplicate sends",
    ],
    isPublished: true,
  },
  {
    title: "Design a Payment System",
    slug: "design-payment-system",
    type: "hld",
    description: `Design a payment processing system like Stripe or Razorpay.

**Requirements:**
- Process credit card payments
- Handle refunds
- Support multiple currencies
- Transaction history and reconciliation
- Webhook notifications to merchants
- PCI DSS compliance considerations
- Idempotent payment processing

**Design Considerations:**
- How do you handle double-charge scenarios?
- How do you ensure exactly-once processing?
- How do you handle payment gateway failures?
- How do you manage settlement with banks?

**Expected Deliverables:**
1. Architecture diagram
2. Payment flow (initiate → authorize → capture → settle)
3. Idempotency and failure handling
4. Database design for transactions
5. Reconciliation process`,
    difficulty: "hard",
    tags: [
      "hld",
      "system-design",
      "distributed-systems",
      "transactions",
      "fintech",
    ],
    rubric: [
      {
        criterion: "Architecture Diagram",
        maxScore: 10,
        description: "Payment gateway, processor, ledger, webhook service",
      },
      {
        criterion: "Payment Flow",
        maxScore: 12,
        description: "Complete lifecycle: auth → capture → settle, 3DS flow",
      },
      {
        criterion: "Idempotency",
        maxScore: 10,
        description: "Idempotency keys, state machine, handling retries safely",
      },
      {
        criterion: "Failure Handling",
        maxScore: 10,
        description:
          "Timeout handling, compensating transactions, saga pattern",
      },
      {
        criterion: "Data Model",
        maxScore: 8,
        description:
          "Transactions ledger, double-entry bookkeeping, audit trail",
      },
      {
        criterion: "Security",
        maxScore: 8,
        description: "PCI compliance, tokenization, encryption at rest",
      },
      {
        criterion: "Reconciliation",
        maxScore: 7,
        description: "Daily settlement, mismatch detection, dispute handling",
      },
    ],
    requirements: [
      "10,000 transactions per second",
      "Zero double-charges (exactly-once semantics)",
      "99.999% availability for payment processing",
      "Support 50+ currencies",
      "Full audit trail for 7 years",
    ],
    hints: [
      "State machine for payment lifecycle prevents invalid transitions",
      "Idempotency key + DB constraint = no double charges",
      "Saga pattern for distributed transactions across services",
      "Separate hot (recent) and cold (archive) transaction storage",
    ],
    isPublished: true,
  },
];

async function seed() {
  await mongoose.connect(env.MONGO_URI);
  console.log("[seed] connected to mongodb");

  await Problem.deleteMany({});
  console.log("[seed] cleared existing problems");

  const inserted = await Problem.insertMany(problems);
  console.log(`[seed] inserted ${inserted.length} problems:`);

  const grouped = { dsa: [], "machine-coding": [], hld: [] };
  for (const p of inserted) {
    grouped[p.type] = grouped[p.type] || [];
    grouped[p.type].push(p);
  }

  for (const [type, items] of Object.entries(grouped)) {
    console.log(`\n  ${type.toUpperCase()} (${items.length}):`);
    for (const p of items) {
      console.log(`    [${p.difficulty}] ${p.title}`);
    }
  }

  await mongoose.disconnect();
  console.log("\n[seed] done");
}

seed().catch((err) => {
  console.error("[seed] error:", err);
  process.exit(1);
});

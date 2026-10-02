---
layout: ../../layouts/WritingLayout.astro
title: "RAG in production: what the demos don't tell you"
description: "A retrieval demo takes an afternoon. The version real users trust is a different project. Here's what tends to go wrong between the two."
date: 2026-02-15
dateLabel: "2026 · 02"
---

Retrieval-augmented generation is the easiest impressive demo in AI. Point a model at some documents, wire up a vector search, ask a question, and watch it answer with sources. You can put that together in an afternoon and get a room full of nods.

Then you hand it to real users, with real documents, and it starts coming apart in ways the demo never hinted at. None of the failures below are exotic. They're just the parts that don't fit in a five-minute demo, so nobody shows them to you. This is the list I wish I'd had the first time.

<figure style="margin: 2.4em 0; text-align: center;">
<svg viewBox="0 0 360 652" role="img" aria-label="A production RAG pipeline. Documents are chunked and embedded into a hybrid vector and keyword index that is kept fresh. Per question, the flow is: question, per-user permission filter, retrieve and re-rank, generate with an LLM, then a cited answer. Evals and monitoring observe the answers." style="width: 100%; max-width: 430px; height: auto; display: block; margin: 0 auto;">
<defs>
<marker id="ah" viewBox="0 0 8 8" markerWidth="7" markerHeight="7" refX="6.2" refY="4" orient="auto"><path d="M1,1 L6,4 L1,7" fill="none" stroke="#aab0b8" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></marker>
<marker id="aha" viewBox="0 0 8 8" markerWidth="7" markerHeight="7" refX="6.2" refY="4" orient="auto"><path d="M1,1 L6,4 L1,7" fill="none" stroke="#2547f4" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></marker>
</defs>
<style>
.b { fill: var(--bg); stroke: var(--hairline); stroke-width: 1; }
.ba { fill: var(--bg); stroke: var(--accent); stroke-width: 1.6; }
.t { font-family: var(--sans); font-size: 14px; font-weight: 600; fill: var(--ink); }
.ta { font-family: var(--sans); font-size: 14px; font-weight: 600; fill: var(--accent); }
.s { font-family: var(--sans); font-size: 10.5px; fill: var(--gray); }
.lbl { font-family: var(--mono); font-size: 10px; fill: var(--gray); letter-spacing: 0.08em; }
.note { font-family: var(--mono); font-size: 10.5px; fill: var(--accent); letter-spacing: 0.02em; }
.cxn { stroke: #aab0b8; stroke-width: 1.4; }
.cxnd { stroke: var(--accent); stroke-width: 1.4; stroke-dasharray: 3 3; }
</style>
<text x="30" y="16" class="lbl">INDEX · built offline, kept fresh</text>
<rect class="b" x="30" y="30" width="300" height="46" rx="8"/>
<text x="180" y="51" text-anchor="middle" class="t">Your documents</text>
<text x="180" y="67" text-anchor="middle" class="s">the real corpus — messy, duplicated, changing</text>
<line class="cxn" x1="180" y1="76" x2="180" y2="96" marker-end="url(#ah)"/>
<text x="192" y="90" class="lbl">chunk · embed</text>
<rect class="b" x="30" y="98" width="300" height="52" rx="8"/>
<text x="180" y="119" text-anchor="middle" class="t">Vector + keyword index</text>
<text x="180" y="136" text-anchor="middle" class="s">embeddings for meaning, keywords for exact IDs</text>
<text x="180" y="168" text-anchor="middle" class="note">kept fresh · re-embed only what changed</text>
<line x1="30" y1="186" x2="330" y2="186" stroke="#e6e8eb" stroke-width="1"/>
<text x="30" y="202" class="lbl">SERVE · per question, per user</text>
<rect class="b" x="30" y="214" width="300" height="44" rx="8"/>
<text x="180" y="235" text-anchor="middle" class="t">Question</text>
<text x="180" y="250" text-anchor="middle" class="s">in the user's own words</text>
<line class="cxn" x1="180" y1="258" x2="180" y2="276" marker-end="url(#ah)"/>
<rect class="ba" x="30" y="278" width="300" height="52" rx="8"/>
<text x="180" y="299" text-anchor="middle" class="ta">Permission filter</text>
<text x="180" y="316" text-anchor="middle" class="s">filtered to what this user may see, first</text>
<line class="cxn" x1="180" y1="330" x2="180" y2="348" marker-end="url(#ah)"/>
<rect class="ba" x="30" y="350" width="300" height="52" rx="8"/>
<text x="180" y="371" text-anchor="middle" class="ta">Retrieve + re-rank</text>
<text x="180" y="388" text-anchor="middle" class="s">pull broad, then re-rank against the query</text>
<line class="cxn" x1="180" y1="402" x2="180" y2="420" marker-end="url(#ah)"/>
<rect class="b" x="30" y="422" width="300" height="44" rx="8"/>
<text x="180" y="443" text-anchor="middle" class="t">Generate (LLM)</text>
<text x="180" y="458" text-anchor="middle" class="s">answer only from retrieved context</text>
<line class="cxn" x1="180" y1="466" x2="180" y2="488" marker-end="url(#ah)"/>
<rect class="ba" x="30" y="490" width="300" height="52" rx="8"/>
<text x="180" y="511" text-anchor="middle" class="ta">Cited answer</text>
<text x="180" y="528" text-anchor="middle" class="s">cites sources · declines when retrieval is thin</text>
<line class="cxnd" x1="180" y1="542" x2="180" y2="580" marker-end="url(#aha)"/>
<text x="192" y="566" class="note">observes</text>
<rect class="ba" x="30" y="582" width="300" height="48" rx="8"/>
<text x="180" y="603" text-anchor="middle" class="ta">Evals + monitoring</text>
<text x="180" y="620" text-anchor="middle" class="s">score vs. a known-good set · watch for drift</text>
</svg>
<figcaption style="font-family: var(--mono); font-size: 12px; color: var(--gray); line-height: 1.55; margin-top: 16px; max-width: 430px; margin-left: auto; margin-right: auto;">A production RAG pipeline. Highlighted in blue — permission filtering, re-ranking, honest citations, and evals — are the parts a five-minute demo skips, and where most of the real work lives.</figcaption>
</figure>

## The demo is a rigged sample

A demo runs on a handful of clean documents you picked, questions you picked, and a user who is also you. Production has thousands of documents you didn't pick, questions from people who don't know your internal vocabulary, and near-duplicate files that quietly contradict each other. The model was rarely the risky part. The risk is in everything you feed it.

So when someone shows me a RAG demo, I don't ask about the model. I ask how many documents, how messy they are, who's actually going to be asking, and what should happen when the answer isn't in the corpus at all. That's the real project, and it's the part the demo skips.

## Retrieval decides everything

If the retrieval step hands the model the wrong passages, no amount of prompt wording rescues it. This is where most of the real work is, and it's also where the least demo attention goes.

Chunking is the first thing to get wrong. Split documents too small and you cut a passage off from the context it needs; too large and the relevant sentence drowns in noise while you burn your token budget. There's no setting that's right for everyone, because it depends on your documents, which is why you can't lift a chunking recipe off a blog post and expect it to hold on yours.

Plain vector similarity is also weaker than the demos let on. Embeddings are good at "these mean roughly the same thing" and bad at exact matches like part numbers, error codes, names, and dates. What usually works is hybrid retrieval: run keyword search next to vector search, merge the results, then re-rank the merged set with a model that reads the actual query against each candidate. Retrieving broad and then re-ranking does more for quality than reaching for a fancier embedding model.

<figure style="margin: 2.4em 0; text-align: center;">
<svg viewBox="0 0 360 176" role="img" aria-label="Illustrative bar chart: retrieval quality is lowest for vector-only search, higher for hybrid vector-plus-keyword search, and highest for hybrid search followed by re-ranking." style="width: 100%; max-width: 400px; height: auto; display: block; margin: 0 auto;">
<text x="30" y="14" font-family="'Instrument Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="#101418">Retrieval quality</text>
<line x1="30" y1="30" x2="30" y2="168" stroke="#e6e8eb" stroke-width="1"/>
<text x="34" y="42" font-family="'Instrument Sans',system-ui,sans-serif" font-size="12" fill="#5b6470">Vector only</text>
<rect x="30" y="48" width="120" height="16" rx="2" fill="#d3d7dd"/>
<text x="34" y="92" font-family="'Instrument Sans',system-ui,sans-serif" font-size="12" fill="#5b6470">Hybrid &#8212; vector + keyword</text>
<rect x="30" y="98" width="190" height="16" rx="2" fill="#9aa1ab"/>
<text x="34" y="142" font-family="'Instrument Sans',system-ui,sans-serif" font-size="12" font-weight="600" fill="#101418">Hybrid + re-rank</text>
<rect x="30" y="148" width="258" height="16" rx="2" fill="#2547f4"/>
</svg>
<figcaption style="font-family: var(--mono); font-size: 12px; color: var(--gray); line-height: 1.55; margin-top: 14px; max-width: 400px; margin-left: auto; margin-right: auto;">Illustrative &mdash; relative shape, not measured numbers. Hybrid retrieval plus a re-ranker beats reaching for a fancier embedding model.</figcaption>
</figure>

## The index goes stale immediately

A demo indexes its documents once. Real documents move. Policies get revised, prices change, old versions get deleted. If your index doesn't follow those changes, the system will cite last quarter's answer with total confidence, and it'll look every bit as convincing as the correct one.

So freshness is an actual engineering problem, not a later cleanup: detecting that a source changed, re-embedding only what changed, and dropping what's gone. Work it out early. Bolting incremental re-indexing onto a system that assumed a frozen corpus is a miserable retrofit.

## Permissions live in the retrieval layer

This is the one that gets people fired, so I'll be blunt. If your corpus holds documents that different users are allowed to see, the access check has to happen at retrieval time, filtered per user, before anything reaches the model. Retrieving across everything and trusting the prompt to keep a secret does not work. Ask the model nicely to ignore the confidential passage and it will still cheerfully summarize it.

Add permissions at the end and what you've shipped is a data leak with a chat box on top. Every chunk needs to carry who can see it, and every query has to filter on the asker before it retrieves anything.

## Without evals you're guessing

Here's the uncomfortable one: with no evaluation, you can't actually tell whether a change helped or hurt. You'll adjust a prompt, spot-check a few questions, decide it feels better, and ship a regression you won't notice for a month.

You need a real evaluation set: questions with known-good answers, taken from how the thing is actually used, plus a way to score new answers against them without doing it by hand every time. It doesn't have to be fancy to start. A hundred representative questions and an honest rubric already beat going on feel. Build it early, because everything downstream (chunking, re-ranking, model choice) is a guess until you can measure it.

## Latency and cost are product decisions

Retrieve, re-rank, then generate, and every stage costs time and money. The demo doesn't notice because it runs once. Production runs all day, and users feel every extra second.

<figure style="margin: 2.4em 0; text-align: center;">
<svg viewBox="0 0 360 96" role="img" aria-label="Illustrative stacked bar showing a request's time split across retrieve, re-rank, and generate, with the generate step the largest share." style="width: 100%; max-width: 400px; height: auto; display: block; margin: 0 auto;">
<text x="30" y="14" font-family="'Instrument Sans',system-ui,sans-serif" font-size="13" font-weight="600" fill="#101418">Where a request spends its time</text>
<rect x="30" y="32" width="54" height="30" fill="#d3d7dd"/>
<rect x="84" y="32" width="66" height="30" fill="#9aa1ab"/>
<rect x="150" y="32" width="180" height="30" fill="#2547f4"/>
<line x1="84" y1="32" x2="84" y2="62" stroke="#ffffff" stroke-width="1.5"/>
<line x1="150" y1="32" x2="150" y2="62" stroke="#ffffff" stroke-width="1.5"/>
<text x="57" y="80" text-anchor="middle" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" fill="#5b6470">retrieve</text>
<text x="117" y="80" text-anchor="middle" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" fill="#5b6470">re-rank</text>
<text x="240" y="80" text-anchor="middle" font-family="'IBM Plex Mono',ui-monospace,monospace" font-size="10.5" fill="#5b6470">generate (LLM)</text>
</svg>
<figcaption style="font-family: var(--mono); font-size: 12px; color: var(--gray); line-height: 1.55; margin-top: 14px; max-width: 400px; margin-left: auto; margin-right: auto;">Illustrative &mdash; the generation step usually dominates latency; the exact split varies by setup.</figcaption>
</figure>

These shape the product; they aren't something to optimize later. How much context can you afford per call? Would a smaller model with better retrieval be cheaper and still good enough? Can you cache the common questions? Decide while you're designing, not after finance reads the first bill.

## It still makes things up

Retrieval reduces hallucination. It doesn't remove it. The model will still occasionally assert something the sources don't support, or fuse two passages into a claim neither one makes.

Two things help. Make it cite: tie each claim back to a passage the user can open and check, so the system is auditable instead of a black box. And let it decline: when retrieval comes back empty or thin, the right answer is "I don't have that," not a smooth guess. A system that knows when to say nothing is worth more than one that always has something to say.

## What I actually reach for

Keep it boring at the start. Hybrid retrieval and a re-ranker will beat an elaborate pipeline you can't debug. Build the eval set before you tune anything. Put access control in the retrieval layer from the first commit rather than the last sprint. Make answers cite their sources, and let them refuse. And watch real queries once you're live, because the questions people actually ask will reshape your chunking and your corpus more than any amount of planning up front.

None of this shows up in the demo, and all of it is the job. The distance between a RAG demo and a RAG system people trust with real work is the whole engagement, and it's the part worth paying for.

If you've got a demo that wowed everyone and then stalled, [that's the gap I close.](/#contact)

---
layout: ../../layouts/WritingLayout.astro
title: "The gap between an AI demo and production"
description: "Most AI projects stall in the gap between a demo that impressed everyone and software that actually runs. That gap is the whole job — here's what lives in it."
date: 2026-07-01
dateLabel: "2026 · 07"
---

Most AI projects don't fail because the idea was bad. They fail in the gap between a demo that impressed everyone and software that actually runs. I've watched it happen enough times that closing that gap is the whole of what I do: I embed in your team, work in your codebase, and hand over running software instead of a recommendation about it.

When people hear "consultant" they picture a deck: a discovery phase, a maturity assessment, some slides, an invoice at the end. I've read plenty of those, and a few were genuinely good. None of them were software that ran.

## The gap nobody owns

I see the same thing again and again. A company decides it should be using AI. Someone builds a demo, internally or through a vendor, and it's impressive enough that everyone gets excited. Then a couple of quarters go by, nothing has shipped, and no one can quite explain the delay.

The explanation is usually that the demo and the real system were never the same project, and the second one is much harder. A demo only has to show the idea can work at all. Production has to hold up next Tuesday, for a user who phrases things in ways you didn't anticipate, on data that changed last week, at a price you can justify, and without ever surfacing a document it shouldn't. Those problems sit between the people who understand the business and the people who can write the code. The strategy side stops at the near edge. Contractors wait on the far side for a finished spec. The part in between is usually nobody's job, and that part is where the thing actually gets built.

## What embedded actually means

I work from inside your team, in your codebase, on your problem, and what I hand over is running software rather than a document about it. In practice that looks like:

- I'm in your standups and your Slack, not on a monthly steering call.
- The code I write goes into your repository, in your stack, reviewed by your engineers.
- What you keep at the end is a system your team can run and change without me.
- I learn enough of your domain to make the small calls myself, because the small calls are where these projects stall.

That last one is easy to underrate. What usually kills an AI project isn't the model. It's the pile of unglamorous decisions around it: which document counts as the source of truth, what "correct" even means for a retrieval result, who's allowed to see which answer, what the system should do when it isn't sure. Someone close to the work can settle those in an afternoon. Someone who shows up once a month can't, so the project waits on them.

## Why AI makes it worse

I've been building production systems for close to twenty years, and a lot of that has nothing to do with the current wave: cloud migrations, data tooling, visualization work for banks. Being embedded helped on all of it. AI just raises the price of not being embedded, because it widens the distance between "looks like it works" and "works."

A normal feature either works or throws an error you can see. An AI feature can be fluent and wrong at the same time, and the wrong version looks exactly like the right one. You won't catch that from a slide, or from a spec written last quarter. You catch it by being in the system while it runs, watching real inputs and building the evaluation that tells you when it starts to drift. That's hands-on work, and it doesn't survive being handed to someone who was never close to it.

## How I work

I split engagements into three moves, and they line up with my services page on purpose.

First, an audit. Before I write anything, I look for the one or two places where AI actually earns its keep in your business, and the places where it plainly doesn't. A lot of the value is in killing the exciting but pointless ideas early.

Then the build. I embed and ship the real version, wired into your systems, with the boring production parts handled: access control, evaluation, monitoring, a cost profile that survives contact with finance. Not a prototype that needs a second project to become real.

Then the handover. It's gone well when your team can run and extend the system without me. I write the docs, pair with your engineers, and work myself out of the picture on purpose. Me turning into a permanent dependency would be a failure on my part.

## Who this is wrong for

I'll be straight about the mismatch. If you want a fixed quote against a spec that's already frozen, you want a contractor, and that's a perfectly reasonable thing to want. If you need a polished document to hand a board, hire someone who's great at documents. This work is close-up, iterative, and a little messy while it's happening, and it asks your team to let someone in. What you get back is software that exists and people who understand how it works.

## If we work together

You get someone in the room and in the code, on the hook for whether the thing runs, instead of a recommendation you then have to go make real yourself. That's the pitch. Plenty of companies are stuck at *"we should be using AI,"* and getting from there to something real in production is the hard part.

That's the part I do. [Tell me what you're stuck on.](mailto:gustave@nganso.com)

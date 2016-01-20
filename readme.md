# A Koa app with MongoDB

One of the biggest differences between Express and Koa was Koa's barebones framework approach. There are no built-in middleware functions or routers, both must be either written yourself or imported from other modules. This allows for a lot of customization but also more work to get the basics going.

Another marked difference is Koa's generators in lieu of callbacks. This is quite convenient (and I imagine even more for someone more experience with generators). The cascading style of the middleware was also very unique, and I'm curious to explore situations where this can be taken advantage of.

I think overall Express is easier to learn and work with, but Koa isn't far behind. I wasn't as fond of the Koa router I used though, I prefer Express' easy to chain built-in router. Also, I constantly had about 5 tabs open for the various Koa modules I imported, and it was very easy to forget or get confused between what each was doing.

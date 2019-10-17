# PLAN-ADAM

This is a IO game with *very realistic simulation*.

The environment setting in this game is at the 50th anniversary of human migration to moon...

The simulator is powered by [PixiJS](https://www.pixijs.com/) and [Parse](https://docs.parseplatform.org/js/guide/)

## Development

This project use webpack.

To run webpack-dev-server:
```
npm run start
```

To compile webpack:
```
npm run build
```

If you want automatically deploy to Github Page when push:
```
git config core.hooksPath .githooks
```

## Feature Checklist

 - [ ] Start game by landing
 - [ ] Default equipment with use limit
 - [ ] Random meteorite to voted place
 - [ ] Physical communication (Use Helmet as medium , etc.)
 - [ ] Land Occupation (build solar panel on owner's land?)
 - [ ] IMS (International Moon Station)

# [1.11.0](https://github.com/leogrigs/portfolio/compare/v1.10.0...v1.11.0) (2025-01-22)


### Features

* extend ContentResponse interface to include additional properties for others ([aa03347](https://github.com/leogrigs/portfolio/commit/aa0334771ace6b9578e3771391792e9d0939a522))
* update About section to use dynamic section title from state ([88c5004](https://github.com/leogrigs/portfolio/commit/88c50044126f9c73ccfb516c5a66d4ab03274959))
* update AppNavigationMenu to use links from Redux store ([4de3861](https://github.com/leogrigs/portfolio/commit/4de38614f3a5c5bdd1356270560a142ff796c585))
* update Experience section to use dynamic section title from state ([0fc9ade](https://github.com/leogrigs/portfolio/commit/0fc9adec583268faed6d5722ae2f2826264ed0d0))
* update Projects section to use dynamic section title from state ([9574d2c](https://github.com/leogrigs/portfolio/commit/9574d2c047005fd3b604ea9c0776069131426b84))

# [1.10.0](https://github.com/leogrigs/portfolio/compare/v1.9.0...v1.10.0) (2025-01-17)


### Features

* add analytics from @vercel/analytics ([edce25f](https://github.com/leogrigs/portfolio/commit/edce25f1d4f2e386c12a54b5d78fad96f8993caa))

# [1.9.0](https://github.com/leogrigs/portfolio/compare/v1.8.0...v1.9.0) (2025-01-17)


### Features

* enhance AppLoader styling for improved responsiveness and visual appeal ([62589df](https://github.com/leogrigs/portfolio/commit/62589dff88dd0daa98559462eb41009e979ddb88))

# [1.8.0](https://github.com/leogrigs/portfolio/compare/v1.7.0...v1.8.0) (2025-01-15)


### Features

* add AppLanguageSelector component for language selection ([7008a33](https://github.com/leogrigs/portfolio/commit/7008a33a88a3e10379f8fa1567354df9876b5f26))
* add locale management with localeSlice and integrate locale into content fetching ([c148dc9](https://github.com/leogrigs/portfolio/commit/c148dc971ac69ca78f913d15550c7f77f42016b6))
* integrate AppLanguageSelector and update data fetching with locale support ([65a548e](https://github.com/leogrigs/portfolio/commit/65a548ebbd9b98c7a827727225db28a43593fec1))

# [1.7.0](https://github.com/leogrigs/portfolio/compare/v1.6.0...v1.7.0) (2025-01-15)


### Features

* add AppLoader component with loading animation and welcome message ([26f92ed](https://github.com/leogrigs/portfolio/commit/26f92ed92a7ae754b7521936fdc0efa35a87ba18))
* add fade-in animation to main content and navigation menu ([0d7edbf](https://github.com/leogrigs/portfolio/commit/0d7edbf8c7aced4501900c834b91b29945d6a4c0))
* integrate AppLoader for improved loading experience ([feaebe7](https://github.com/leogrigs/portfolio/commit/feaebe733c6a9db57afaf7bff80dfe650e8a2b20))

# [1.6.0](https://github.com/leogrigs/portfolio/compare/v1.5.0...v1.6.0) (2025-01-14)


### Features

* add DOMPurify for sanitizing bulletText in AppBullet component ([3e88e12](https://github.com/leogrigs/portfolio/commit/3e88e12b28f44ab55752d74761861aead4469ea9))
* add resumeLink to ContentResponse interface ([0aa0aa5](https://github.com/leogrigs/portfolio/commit/0aa0aa51c6ba220b24ce2bc810df281485f2eedb))
* extend ContentResponse interface to include experience details ([0cfe0d3](https://github.com/leogrigs/portfolio/commit/0cfe0d325054c5cfbeefbbc55fca182e7a8cc5cd))
* fetch resume link from Redux store in AppResumeButton component ([ae97bb8](https://github.com/leogrigs/portfolio/commit/ae97bb8286bf00d424ac756a25dbfa16ded5e719))
* implement data fetching for About section using useSelector ([ab4ac7e](https://github.com/leogrigs/portfolio/commit/ab4ac7e4bbb05239d58f92ba7ea6add3cea55bc8))
* implement data fetching for projects section using useSelector ([319c178](https://github.com/leogrigs/portfolio/commit/319c178d36b074b0d464a9933a1f592b3d44a6b0))
* implement experience data fetching and rendering in Experience component ([3f7e658](https://github.com/leogrigs/portfolio/commit/3f7e65800df826f0d1e46b452c8318c184d873c5))
* update ContentResponse interface to change projects structure ([fdb5fdd](https://github.com/leogrigs/portfolio/commit/fdb5fdd713d29f04287288754d9a84aedc91a5b3))

# [1.5.0](https://github.com/leogrigs/portfolio/compare/v1.4.0...v1.5.0) (2025-01-13)


### Features

* add fetchContentfulData function to retrieve entries from Contentful ([f6c20b6](https://github.com/leogrigs/portfolio/commit/f6c20b6567acd2021b004b9a024b2709a5fec9c1))
* add Redux slice and store configuration for Contentful data management ([1b234b0](https://github.com/leogrigs/portfolio/commit/1b234b04f8e328e802445c738c4e553aac398320))
* integrate Redux store and fetch data on App component mount ([978bf16](https://github.com/leogrigs/portfolio/commit/978bf1666d6ce409867b4d7cf7712f05dca5ba82))

# [1.4.0](https://github.com/leogrigs/portfolio/compare/v1.3.0...v1.4.0) (2025-01-09)


### Features

* refactor Welcome component to fetch and display structured welcome data from Contentful ([edb35af](https://github.com/leogrigs/portfolio/commit/edb35af0dd352dda3a227c9f59f39bcf2aad91dc))

# [1.3.0](https://github.com/leogrigs/portfolio/compare/v1.2.0...v1.3.0) (2025-01-09)


### Features

* fetch and display first field description from Contentful ([3d6cad1](https://github.com/leogrigs/portfolio/commit/3d6cad1b2029abd444ae4389b42902444963e6bc))

# [1.2.0](https://github.com/leogrigs/portfolio/compare/v1.1.0...v1.2.0) (2025-01-06)


### Features

* add AppResumeButton component to display a resume link ([a64a867](https://github.com/leogrigs/portfolio/commit/a64a8673615e8ec1bd7b142c9d46343f42baad9b))

# [1.1.0](https://github.com/leogrigs/portfolio/compare/v1.0.0...v1.1.0) (2025-01-05)


### Features

* update favicon link to point to the new logo location ([2b7e42b](https://github.com/leogrigs/portfolio/commit/2b7e42b21d8c6738136563bbf2ebd90c3042ea03))

# 1.0.0 (2025-01-05)


### Bug Fixes

* adjust AppCard layout for improved spacing and height ([5d7f67f](https://github.com/leogrigs/portfolio/commit/5d7f67ff60ae150655f6ce33be8c2064e1f0a5f3))
* adjust padding in AppSectionWrapper for improved layout ([f8ae36c](https://github.com/leogrigs/portfolio/commit/f8ae36c73871985907cb4ff93d3122955a0677dc))
* enhance layout and spacing in AppSectionWrapper for better readability ([5bcbba3](https://github.com/leogrigs/portfolio/commit/5bcbba30c0f835422bd3127195e772606e0583c9))
* update AppNavigationMenu to be responsive on medium screens ([c9c49da](https://github.com/leogrigs/portfolio/commit/c9c49da85b83b8b80bf2e40e38425ffa290089f8))
* update AppNextSectionButton to handle default sectionId and toggle icon based on section ([17be829](https://github.com/leogrigs/portfolio/commit/17be8291a4493f4b43d36fdcff14116ce48d19bb))
* update document type and title in index.html ([7a19ed3](https://github.com/leogrigs/portfolio/commit/7a19ed3f60b176f4bf18efc61c0012cf0b4b28fe))


### Features

* add About section and update navigation for improved user flow; adjust background colors for consistency ([853fdaa](https://github.com/leogrigs/portfolio/commit/853fdaaa06f888db0552895a713dc6855bc301ac))
* add AppBullet component for displaying bullet points with icons ([06ad997](https://github.com/leogrigs/portfolio/commit/06ad997fd00925378bcd5feaa989d777177884aa))
* add AppNextSectionButton component for smooth section navigation ([9efb063](https://github.com/leogrigs/portfolio/commit/9efb06342d00747d7145ff7597c9166ebdb3a0a5))
* add AppNextSectionButton to Experience section for improved navigation ([c08a7f0](https://github.com/leogrigs/portfolio/commit/c08a7f03a9bbf8a157fe324677b1b4ae4da1002d))
* add AppSectionWrapper component for structured section layout and navigation ([3449712](https://github.com/leogrigs/portfolio/commit/3449712079694edb7a81bd1169abf2dd2ec63f44))
* add Button component with variant and size support from shadcnui ([0d472f0](https://github.com/leogrigs/portfolio/commit/0d472f0f8e7d7cb31fd60ef5ee834e22193b9655))
* add Contact section for user outreach with social media links ([fc1ae40](https://github.com/leogrigs/portfolio/commit/fc1ae40afb3118d34137cd22d133cfdbca55759d))
* add Experience section with tabs for project details ([68b84d3](https://github.com/leogrigs/portfolio/commit/68b84d33c749aa2be8b34717fe185ff2f68c73cc))
* add external links for enhanced navigation on EXPERIENCE const ([8c03dac](https://github.com/leogrigs/portfolio/commit/8c03dac9aac955b6514948e3581f7ea68d639a8b))
* add ICard interface for card data structure ([682e630](https://github.com/leogrigs/portfolio/commit/682e630fd5ebf95d51bfdb18269a5f4123ee1530))
* add navigation menu component and integrate it into the App layout ([e522fd0](https://github.com/leogrigs/portfolio/commit/e522fd0b60c2ff8385b4686fe8dcb7fcd96a4ca6))
* add project links in PROJECTS const ([d315299](https://github.com/leogrigs/portfolio/commit/d3152996f7e6056adbb5b20537279705288d1452))
* add ThemeToggle component and ThemeProvider for theme management ([f5c6bb9](https://github.com/leogrigs/portfolio/commit/f5c6bb9eaa6e4056b92381fab35f059a6645e173))
* create Summary component and update App layout with new structure ([742fe26](https://github.com/leogrigs/portfolio/commit/742fe264be97c12975dcbe79ab6a34e197b22fed))
* enable smooth scrolling for improved user experience ([395fada](https://github.com/leogrigs/portfolio/commit/395fada911f6b487a783e10d1b8b3d1090e5bab2))
* enhance AppSectionWrapper with section title and adjust layout for improved spacing ([5a83998](https://github.com/leogrigs/portfolio/commit/5a8399809027581391c3cda844b28c84dfaf04b8))
* enhance navigation link styling with hover effect ([a9eb238](https://github.com/leogrigs/portfolio/commit/a9eb2386f39bb333b1e5806bca07ddb2e0523c0e))
* enhance Summary section layout and add AppNextSectionButton for navigation ([caf6c0e](https://github.com/leogrigs/portfolio/commit/caf6c0eabe78abfa8cfff6e5452a02802bd3250d))
* implement ABOUT section with bullet points for improved readability ([accbc4b](https://github.com/leogrigs/portfolio/commit/accbc4b86af4b3072580baad7750fdf4d96490ac))
* implement Badge component and update AppCard to use it for technology display ([490fb89](https://github.com/leogrigs/portfolio/commit/490fb895bd5c0ba6d223609a934f174d2a551825))
* refactor Experience section to use AppSectionWrapper for improved structure and navigation ([1f54490](https://github.com/leogrigs/portfolio/commit/1f544905362683941bfdac37f89b72e07eb5441e))
* refactor Summary section to use AppSectionWrapper for improved structure and navigation ([3219b32](https://github.com/leogrigs/portfolio/commit/3219b32bf8a24d21cd170ce6ad7567d50e7d89b7))
* rename Summary section to Welcome and update navigation links for improved user experience ([9af4e2a](https://github.com/leogrigs/portfolio/commit/9af4e2aeff3af924fc7ab7b6f07336c4713604bc))
* replace ABOUT constant with updated content in React format ([ba6c0fd](https://github.com/leogrigs/portfolio/commit/ba6c0fd418a6ceeb5000817fb26f53e99700695d))
* replace tabs with AppCard component to display experiences dynamically ([45bc342](https://github.com/leogrigs/portfolio/commit/45bc342075361642a8671185b8362b3ae2f4683b))
* update About and Welcome sections for improved layout and content clarity ([71c5f2c](https://github.com/leogrigs/portfolio/commit/71c5f2c89d0d10734bafcca2a215d3445411aa16))
* update About section for improved clarity and layout; enhance text content and add badge link ([388abd4](https://github.com/leogrigs/portfolio/commit/388abd4c3b07f6f29d9e844f78bfb3a0bda1e52b))
* update AppBullet component to accept ReactNode for bulletText and improve layout ([4be080e](https://github.com/leogrigs/portfolio/commit/4be080eb87761da869c66e0a051983abecd14736))
* update experience content with detailed project descriptions and technologies used ([4112c4a](https://github.com/leogrigs/portfolio/commit/4112c4ab4513615b8769be7596deabf759357f43))
* update project descriptions and technologies in PROJECTS constant for better clarity and detail ([b55dbfd](https://github.com/leogrigs/portfolio/commit/b55dbfde4c64c1d7ed8929b16636f5616f169d72))
* update Projects section to use AppCard component for dynamic project display ([47c5198](https://github.com/leogrigs/portfolio/commit/47c5198ca51f24a695b36b530908d38d0695856b))
* wrap App component with ThemeProvider and add ThemeToggle to navigation menu ([03cd05b](https://github.com/leogrigs/portfolio/commit/03cd05bb8f4de6b3e65ae4e1f88efa3fc411f937))

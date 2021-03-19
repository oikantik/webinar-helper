This is a package for StealthSeminar users for showing webinar date and time, countdown and calendar .

Add this to the header section of your page

```
https://cdn.jsdelivr.net/gh/oikantik/webinar-helper/viewer-information.css
```

This package is dependent on DayJS heavily. These are the dependencies:

```
<script src="https://unpkg.com/dayjs@1.10.4/dayjs.min.js"></script>

<script src="https://unpkg.com/dayjs@1.10.4/plugin/utc.js"></script>

<script src="https://unpkg.com/dayjs@1.10.4/plugin/timezone.js"></script>

<script src="https://unpkg.com/dayjs@1.10.4/plugin/advancedFormat.js"></script>
```

Make sure to put these before the end of the body section.

And then add this package.

```
https://cdn.jsdelivr.net/gh/oikantik/webinar-helper/viewer-information.js
```

Now you can use these
```
<!-- for showing text date time -->
<div class="ss-datetime"></div>

<!-- for showing calendar date time -->
<div class="ss-calendar"></div>

<!-- for showing countdown -->
<div class="ss-countdown"></div>
```

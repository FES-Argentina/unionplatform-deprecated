# UnionPlatform

> An application to improve the communication between labor unions and its members.

Union Platform is an application to improve the communication between labor
unions and its members. It allows to share news and documents, enrollment
through the app and upload complaints and georeferenced alerts, with a drupal
powered backend.  It was developed with the support of [FES Argentina][0] for
[Asociación de Personal de Plataformas][1].

## API Keys

To build the project you need to define your google maps api key in
`android/app/src/main/res/values/secrets.xml`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="google_maps_api_key">YOUR_API_KEY</string>
</resources>
```

[0]: https://www.fes-argentina.org
[1]: https://twitter.com/AppSindical

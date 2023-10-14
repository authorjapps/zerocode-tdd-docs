
You can passit it via -D
```
test {
    systemProperty "env", System.getProperty("env")
}
```

Then run Gradle CLI command:
```bash
gradle test -Denv=dev

gradle test -Denv=sit
```

or alternatively,

You can passit it via -P

```
test {
    systemProperty "env", project.getProperty("env")
}
```
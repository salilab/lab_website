Source files for parts of the Sali Lab website.

The `make-jinja.py` Python script builds the actual website from the sources:

 - HTML files with a leading underscore are
   [Jinja2](https://pypi.org/project/Jinja2/) templates and are not
   installed.
 - All other HTML files are rendered using Jinja2.
 - All remaining files are simply installed in a similar fashion to `make`.

Typically `make-jinja.py` is run from a `Makefile` similar to

```
install::
	./make-jinja.py ./html /var/www/html/
```

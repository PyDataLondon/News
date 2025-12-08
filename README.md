# PyData London News

An archive for the PyData London News

## Creating new news slides

If you are using the Conda package manager, create an environment with the
requisite dependencies and activate it using:

```
conda env create -f=environment.yml
source activate pydata-news
```

Otherwise, get a setup with Python 3 and Jupyter available by your preferred
mechanism.

Create a new folder for the slides with a name based on the date of the meeting
(see previous meetings' folder names), and create an IPython notebook inside the
folder. Alternatively, copy the folder from a previous month and rename it,
which may be easier.

Once you have made modifications/additions to the month's slides, convert it to
a slideshow and serve it with:

```
jupyter nbconvert <name of ipynb file> --to slides --post serve
```

Bonus point: add `--no-input` to hide the input cells:

```
jupyter nbconvert <name of ipynb file> --to slides --no-input --post serve
```

## Shared static assets

Common CSS and images now live in `static/` and can be linked into each month's
folder so we only maintain them once.

- Add your notebook in a new month folder as usual, and put any month-specific
  images under `<month>/images/`.
- Run `python utils/link_static.py` from the repo root. It hashes and replaces
  matching `custom.css` files and any `*.png` images that exist in `static/images/`
  with symlinks. Files with different contents are left untouched.
- Edit shared CSS in `static/css/` or drop/update shared images in
  `static/images/` to update every linked month at once.
- On Windows you may need to enable Developer Mode or run a shell with elevated
  privileges to allow symlink creation.

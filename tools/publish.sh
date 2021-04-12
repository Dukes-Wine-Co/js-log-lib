# skip publish if no package.json exists
if [ ! -f ./package.json ]; then
    echo "Skipping publish, (no package.json found)"
else
    # read package name/version from package.json
    # only publish if the latest package version has not been published
    package=$(node -e "console.log(require('./package.json').name)")
    version=$(node -e "console.log(require('./package.json').version)")
    published=$(npm info $package@$version version)
    if [ "$version" = "$published" ]; then
        echo "$package@$version is already published!"
    else
        (npm publish --access=public)
        echo "Publishing: $package@$version (published: $published)"
    fi
fi

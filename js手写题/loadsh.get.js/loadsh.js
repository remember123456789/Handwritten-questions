//实现Loadsh.get 获取长链
const object = { a: [{ b: { c: 3 } }] };

//=> 3
get(object, "a[0].b.c");

function get(source, path, defaultValue = undefined) {
    // a[3].b -> a.3.b -> [a, 3, b]
    const paths = path
        .replace(/\[(\w+)\]/g, ".$1")
        .replace(/\["(\w+)"\]/g, ".$1")
        .replace(/\['(\w+)'\]/g, ".$1")
        .split(".");
    let result = source;
    for (const p of paths) {
        result = result?.[p];
    }
    return result === undefined ? defaultValue : result;
}


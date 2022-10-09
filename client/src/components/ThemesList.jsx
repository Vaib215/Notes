const ThemeOption = ({ themeName, setTheme }) => {
    return (
        <li className="flex flex-col gap-2" data-theme={themeName.toLowerCase()}>
            <div onClick={() => setTheme(themeName.toLowerCase())} className="flex flex-row gap-2 items-center">
                <div className="w-4 h-4 bg-primary rounded-full"></div>
                <div className="w-4 h-4 bg-secondary rounded-full"></div>
                <div className="w-4 h-4 bg-neutral rounded-full"></div>
                <div className="w-4 h-4 bg-accent rounded-full"></div>
                <div className="text-lg">{themeName}</div>
            </div>
        </li>
    )
}

const ThemesList = ({setTheme}) => {
    return (
        <ul tabIndex={0} className="menu p-2 shadow bg-base-100 rounded-box w-52">
            <ThemeOption themeName="Light" setTheme={setTheme}/>
            <ThemeOption themeName="Dark" setTheme={setTheme}/>
            <ThemeOption themeName="Cupcake" setTheme={setTheme}/>
            <ThemeOption themeName="Bumblebee" setTheme={setTheme}/>
            <ThemeOption themeName="Emerald" setTheme={setTheme}/>
            <ThemeOption themeName="Corporate" setTheme={setTheme}/>
            <ThemeOption themeName="Synthwave" setTheme={setTheme}/>
            <ThemeOption themeName="retro" setTheme={setTheme}/>
            <ThemeOption themeName="cyberpunk" setTheme={setTheme}/>
            <ThemeOption themeName="valentine" setTheme={setTheme}/>
            <ThemeOption themeName="halloween" setTheme={setTheme}/>
            <ThemeOption themeName="garden" setTheme={setTheme}/>
            <ThemeOption themeName="forest" setTheme={setTheme}/>
            <ThemeOption themeName="aqua" setTheme={setTheme}/>
            <ThemeOption themeName="lofi" setTheme={setTheme}/>
            <ThemeOption themeName="pastel" setTheme={setTheme}/>
            <ThemeOption themeName="fantasy" setTheme={setTheme}/>
            <ThemeOption themeName="wireframe" setTheme={setTheme}/>
            <ThemeOption themeName="black" setTheme={setTheme}/>
            <ThemeOption themeName="luxury" setTheme={setTheme}/>
            <ThemeOption themeName="dracula" setTheme={setTheme}/>
            <ThemeOption themeName="cmyk" setTheme={setTheme}/>
            <ThemeOption themeName="autumn" setTheme={setTheme}/>
            <ThemeOption themeName="business" setTheme={setTheme}/>
            <ThemeOption themeName="acid" setTheme={setTheme}/>
            <ThemeOption themeName="lemonade" setTheme={setTheme}/>
            <ThemeOption themeName="night" setTheme={setTheme}/>
            <ThemeOption themeName="coffee" setTheme={setTheme}/>
            <ThemeOption themeName="winter" setTheme={setTheme}/>
        </ul>
    )
}

export default ThemesList
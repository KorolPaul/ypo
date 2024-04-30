import { JSXElement, onMount, createSignal } from "solid-js";

export interface Props {
    titles: Array<string>;
    children: JSXElement,
}

const Tabs = ({titles, children}: Props) => {
    const [activeSlide, setActiveSlide] = createSignal(0);
    let tabsContentRef: HTMLElement;

    onMount(() => {
        if (tabsContentRef.children[0].children.length) {
            for (let el of tabsContentRef.children[0].children) {
                el.outerHTML = `<div class="tabs_tab">${el.outerHTML}</div>`
            }

            tabsContentRef.children[0].children[0].classList.add('active');
        }
    });

    function changeActiveTab(index: number) {
        setActiveSlide(index);

        tabsContentRef.querySelectorAll('.tabs_tab').forEach(el => el.classList.remove('active'));

        tabsContentRef.children[0].children[index].classList.add('active');
    }

    return (
        <div class="tabs">
            <div class="tabs_buttons">
                {titles.map((title, index) => (
                    <button class="tabs_button" classList={{ active: activeSlide() === index }} onClick={() => changeActiveTab(index)}>
                        {title}
                    </button>
                ))}
            </div>

            <div class="tabs_content" ref={tabsContentRef}>
                {children}
            </div>
        </div>
    );
};

export default Tabs;
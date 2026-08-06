/** target/rel for links that leave the site - mailto and internal paths stay put */
export function externalProps(href: string) {
  return href.startsWith("http")
    ? ({ target: "_blank", rel: "noopener noreferrer" } as const)
    : {};
}

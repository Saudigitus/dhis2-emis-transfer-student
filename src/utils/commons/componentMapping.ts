import OrgUnitTree from "../../components/orgUnitTree/OrgUnitTree"

type ComponentMapping = Record<string, React.ComponentType<any>>;

const componentMapping: ComponentMapping = {
    orgUnitTree: OrgUnitTree,
}

export { componentMapping }
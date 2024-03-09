import { useSearchParams } from 'react-router-dom'

const useParams = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const add = (key: string, value: string) => {
        searchParams.set(key, value)
        setSearchParams(searchParams)
    }
    const remove = (key: string) => {
        searchParams.delete(key)
        setSearchParams(searchParams)
    }
    const useQuery = () => {
        return new URLSearchParams(searchParams)
    }

    const urlParamiters = () => {
        return {
            school: useQuery().get('school'),
            schoolName: useQuery().get('schoolName'),
            academicYear: useQuery().get('academicYear'),
            sectionType: useQuery().get('sectionType'),
        }
    }
    return { add, remove, useQuery, urlParamiters }
}
export { useParams }

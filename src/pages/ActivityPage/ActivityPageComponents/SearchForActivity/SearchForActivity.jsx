import styles from "./SearchForActivity.module.css";
import Button from "@mui/material/Button";

const SearchForActivity = ({ searchInput, setSearchInput, onSearch }) => {
    return (
        <div className={styles.searchWrapper}>
            <input
                type="text"
                placeholder="ابحث عن النشاط..."
                value={searchInput}
                onChange={(e) => {
                    const value = e.target.value;
                    setSearchInput(value);

                    if (value.trim() === "") {
                        onSearch(); 
                    }
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                className={styles.searchInput}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={onSearch}
            >
                ابحث
            </Button>
        </div>
    );
};

export default SearchForActivity;

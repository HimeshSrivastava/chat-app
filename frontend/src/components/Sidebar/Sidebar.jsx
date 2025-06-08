import { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../constant/Api";
import SidebarUsers from "./SidebarUsers";
import LogoutButton from "../LogoutButton";
import debounce from "lodash.debounce";
import { TextField, Box, Typography, CircularProgress, Paper,Grid2, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  async function req(postdata, endpoint, method = "POST", token = null) {
    const instance = axios.create();
    const options = {
      url: endpoint,
      method: method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...(method !== "GET" && method !== "DELETE" && { data: postdata }),
    };
    try {
      const response = await instance(options);
      return response.data;
    } catch (e) {
      console.log("Error:", e);
      throw e;
    }
  }

  useEffect(() => {
    const getAllUsers = async () => {
      setLoading(true);
      try {
        const user = JSON.parse(localStorage.getItem("chat-User"));
        if (!user || !user.token) {
          console.error("No token found");
          return;
        }

        const token = user.token;
        const result = await req(null, `${BACKEND_URL}/api/user`, "GET", token);

        if (Array.isArray(result)) {
          setUsers(result);
          setFilteredUsers(result);
        } else if (result && Array.isArray(result.data)) {
          setUsers(result.data);
          setFilteredUsers(result.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]);
        setFilteredUsers([]);
      } finally {
        setLoading(false);
      }
    };

    getAllUsers();
  }, []);

  const debouncedSearch = debounce((term) => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(term.toLowerCase())
      )
    );
  }, 300);

  useEffect(() => {
    if (searchTerm) {
      debouncedSearch(searchTerm);
    } else {
      setFilteredUsers(users);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, users]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "100%", sm: "33%", md: "25%", lg: "20%", xl: "16%" },
        backgroundColor: "rgb(224, 242, 241)",
        padding: 2,
        gap: 2,
        height: "100vh",
      }}
    >
      {/* Search Bar */}
      <Paper
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "4px 8px",
          boxShadow: 2,
          borderRadius: "8px",
        }}
      >
        <SearchIcon sx={{ color: "gray" }} />
        <TextField
          variant="standard"
          placeholder="Search"
          fullWidth
          InputProps={{
            disableUnderline: true,
          }}
          sx={{ marginLeft: 1 }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Paper>

      {/* Users List */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: "8px",
          padding: 1,
          backgroundColor: "white",
        }}
      >
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
            <CircularProgress size={24} />
          </Box>
        ) : filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <SidebarUsers key={user._id} name={user.name} user={user} />
          ))
        ) : (
          <Typography variant="body1" color="textSecondary" align="center">
            No users found.
          </Typography>
        )}
      </Box>

      {/* Logout Button */}
      <Grid2 spacing={3} columnSpacing={3}>
        <LogoutButton />
        <Button
            component={Link}
            to="/ai-chat"
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: 'rgb(224, 242, 241)',
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgb(178, 223, 219)',
              },
            }}
          >
            AI Assistant
          </Button>
      </Grid2>
    </Box>
  );
};

export default Sidebar;

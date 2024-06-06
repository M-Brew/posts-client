import React from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

import DeleteOutline from "@mui/icons-material/DeleteOutline";
import { orange } from "@mui/material/colors";

export default function PostCard(props: IPostCard) {
  const { post, handleDelete } = props;

  return (
    <div>
      <Card elevation={1}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: orange[300] }}>
              {post.category[0].toUpperCase()}
            </Avatar>
          }
          title={post.title}
          subheader={post.category}
          action={
            <IconButton onClick={() => handleDelete(post.id)}>
              <DeleteOutline />
            </IconButton>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {post.body}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

interface IPostCard {
  post: IPost;
  handleDelete: (id: string) => void;
}

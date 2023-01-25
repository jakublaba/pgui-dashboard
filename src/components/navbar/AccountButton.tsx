import React, {SyntheticEvent, useRef, useState} from "react";
import {ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {useSelector} from "react-redux";
import {RootState} from "../../redux/store";
import languages from "../../redux/lang/languages";

const AccountButton: React.FC = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const lang = useSelector((state: RootState) => state.lang.current);

    const handleToggle = () => {
        setOpen(open => !open);
    }

    const handleClose = (e: Event | SyntheticEvent) => {
        if (anchorRef.current && anchorRef.current.contains(e.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    }

    return (
        <div>
            <IconButton
                ref={anchorRef}
                onClick={handleToggle}
            >
                <AccountCircleIcon/>
            </IconButton>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                transition
                disablePortal
            >
                {({TransitionProps}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: "left top"}}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    <MenuItem onClick={() => {
                                        setOpen(false);
                                        navigate("/");
                                    }}>
                                        {languages.get(lang)!.home}
                                    </MenuItem>
                                    <MenuItem onClick={() => {
                                        setOpen(false);
                                        navigate("/account");
                                    }}>
                                        {languages.get(lang)!.account}
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default AccountButton;

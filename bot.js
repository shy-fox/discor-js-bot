const {
    token,
    commands,
    prefix,
    categories,
    members,
    roles,
    config,
    imgs,
    curses,
    help
} = require("./satan.config.json");

const {
    Client
} = require("discord.js");

const mysql = require("mysql");

const Satan = new Client();

const con = mysql.createConnection(config);

var response = 0;

con.connect(err => {
    if (err) throw err;
    console.log("Connected!")
})

Satan.on("ready", () => {

    console.log(`${Satan.user.tag} is now ready for commands.`);

    Satan.user.setPresence({
        status: "dnd",
        activity: {
            name: "our underlings! >:3",
            type: "WATCHING"
        }
    });
});

Satan.on("guildMemberAdd", async member => {
    if (member.guild.id === "758383312786948138") {
    
        if (member.id === "759830837813444608") {
            member.ban({
                reason: "U know that ur not allowed here! >:3"
            });
            return;
        }
    }
});

Satan.on("message", async msg => {
    if (msg.author.bot) return;
    //msg.guild.members.cache.find(members.alice).roles.add(msg.guild.roles.cache.find("759864622399356988")).catch(reason => { if (reason) console.log(reason)});

    let logging = `INSERT INTO \`cia_of_hell\` (id, content, author, channel, timestamp) VALUES (${msg.id}, '${msg.content.replace(/'/g, "")}', '${msg.author.id}', '${msg.channel.id}', current_timestamp())`;
    con.query(logging, (err, res) => {
        if (err) throw err;
        console.log("Logged successfully.");
    })

    if (msg.channel.id === categories.hell.txtChannels.gate && msg.guild.members.cache.find(u => u.id === msg.author.id).roles.cache.find(r => r.id === roles.gatekeeper)) {
        if (msg.content.startsWith("allow")) {
            msg.mentions.members.first().roles.add(msg.guild.roles.cache.find(r => r.id === roles.underlings));
            console.info(`Added ${msg.guild.roles.cache.find(r => r.id === roles.underlings).name} to ${msg.mentions.members.first().user.tag}`);
    
            let author = msg.guild.roles.cache.find(r => r.id === roles.gatekeeper).members.random();
    
            member.send("", {
                embed: {
                    author: {
                        name: author.nickname,
                        iconURL: author.user.avatarURL()
                    },
                    title: "Hell",
                    description: "Hello underling. Just wanted to remind you that they now own you~. You are now their plaything. >:3"
                }
            });
        }
        if (msg.content.startsWith("deny")) {
            msg.mentions.members.first().kick("The council and gatekeepers found you as unworthy!");
        }
    } 

    if (msg.author.id === members.shiromi || msg.author.id === members.alice) {
        switch (msg.content.toLowerCase()) {
            case "dad?":
                msg.channel.send(`${msg.author.id === members.shiromi ? "Shiromi, what's wrong? T" : "Alice? What's wrong...t"}alk to me or maybe ${msg.author.id === members.alice ? "your big sister? I can't always help." : "Alice...she should be able to help you."}`);
                response = 1;
                break;
            case "dad!":
                msg.channel.send(`${msg.author.id === members.alice ? "Alice...?" : "Shiromi, what is going on!?"}`);
                response = 2;
                break;
        }
    }

    if (msg.guild.id !== "758383312786948138" && msg.content.startsWith(prefix) && !(msg.author.id === members.alice || msg.author.id === members.shiromi)) {
        msg.delete();
        return;
    }

    if ((msg.content.includes("@everyone") || msg.content === ";=;") && !(msg.author.id === members.alice || msg.author.id === members.shiromi)) {
        msg.delete().then(msg => {
            msg.channel.send("How dare you!")
        })
    }

    if (!msg.content.startsWith(prefix)) return;
    var cmd = msg.content.substr(1);

    var pr = cmd.split(" ")[0];
    var args = cmd.split(" ").splice(1);

    console.log(`Command: ${pr}\nArgs: ${args}`);

    const satan_ = msg.guild.members.cache.find(u => u.id === members.satan);

    switch (pr) {
        case commands.souls:

            var collector = msg.guild.roles.cache.find(r => r.id === roles.collector).members.random().user;
            
            if (msg.channel.id !== categories.hell.txtChannels.souls && (msg.author.id !== members.alice || msg.author.id !== members.shiromi)) break;
            var sql = "SELECT * FROM sacrifices ORDER BY 'count' DESC";
            var sql_1 = "SELECT * FROM victims ORDER BY 'victim_no' DESC";

            let _tmp, _count, _tmp_vicitm, _c_victim;
        
            con.query(sql, (err, res, fields) => {
                if (err) throw err;
                _tmp = (res[res.length - 1].count);
                _tmp_vicitm = (res[res.length - 1].tag);
                con.query(sql_1, (err1, res1, fields1) => {
                    if (err1) throw err;
                    _count = (res1[res1.length - 1].victim_no);
                    _c_victim = (res1[res1.length - 1].tag)

                    msg.channel.send("", {
                        embed: {
                            color: 8359053,
                            title: "Souls served",
                            author: {
                                name: collector.tag,
                                iconURL: collector.avatarURL()
                            },
                            description: `Souls collected and served: ${_tmp}\nKills: ${_count}\nLatest Sacrifce: **${_tmp_vicitm}**\nLastest Death: **${_c_victim}**`
                        }
                    });
                });
            });
            break;
        case commands.sacrifice:
            if (args.length != 1) break;

            let victim = msg.guild.members.cache.find(u => u.id === members.alice);

            if (args[0] !== "*") {
                if (msg.mentions.members.first().id === members.satan) {
                
                    if (msg.author.id === members.shiromi || msg.author.id === members.alice) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Daughter",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, my daughter, why?`
                            }
                        });
    
                        break;
                    }
                    
                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: "Underling",
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: `${msg.author.tag}, you don't want to do this!`
                        }
                    });
    
                    break;
                }

                if ((msg.mentions.members.first().id === members.alice || msg.mentions.members.first().id === members.shiromi) && args[0] !== "*") {

                    if ((msg.mentions.members.first().id === members.alice && msg.author.id === members.shiromi) || (msg.mentions.members.first().id === members.shiromi && msg.author.id === members.alice)) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Daughter",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, do you want to sacrifice your sister?`
                            }
                        });
    
                        break;
                    }


                    if (msg.mentions.members.first().id === msg.author.id) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Dad",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, why do you want to do this.`
                            }
                        });

                        break;
                    }

                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: `Last Warning: ${msg.author.tag}`,
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: "How dare you lay hands on my daughters!\nEither both my daughters or I myself will sacrifice you, underling!"
                        }
                    });
                    break;
                }

                
                if (msg.guild.members.cache.find(m => m.id === msg.mentions.members.first().id).roles.highest.position > (msg.guild.members.cache.find(a => a.id === msg.author.id).roles.highest.position)) {
                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: "Sacrifice",
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: "You can't sacrifice someone of a higher rank than youself."
                        }
                    });
                    break;
                }
            }


            if (args[0] === "*") {
                sql = `INSERT INTO sacrifices (count, tag, id, date) VALUES`
                msg.guild.members.cache.forEach(m => {
                    if (!(m.id === members.alice || m.id === members.shiromi || m.id === members.satan)) {
                        victim = m;
                        sql += ` (NULL, '${victim.user.tag}', '${victim.user.id}', current_timestamp()),`;
                    }
                });

                sql = sql.substr(0, sql.length - 1);
            }

            if (args[0] !== "*") {
                victim = msg.guild.members.cache.find(u => u.id === msg.mentions.users.first().id);
                sql = `INSERT INTO sacrifices (count, tag, id, date) VALUES (NULL, '${victim.user.tag}', '${victim.user.id}', current_timestamp())`;
            }

            console.log(sql)
            
            con.query(sql, (err, res) => {
                if (err) throw err;
                if (args[0] === "*") victim = msg.guild.roles.cache.find(r => r.id === roles.daughter).members.random();

                msg.channel.send("", {
                    embed: {
                        color: victim.roles.highest.color,
                        title: "Sacrifice",
                        author: {
                            name: victim.user.tag,
                            iconURL: victim.user.avatarURL()
                        },
                        description: "Their sacrifice will be appreciated."
                    }
                });
            });

            break;
        case commands.pentagram: 

            const s = msg.guild.members.cache.find(u => u.id === members.satan);
            
            msg.channel.send("", {
                embed: {
                    color: s.roles.cache.find(r => r.id === roles.heat).color,
                    title: "This is what you wanted",
                    description: "A pentagram?",
                    author: {
                        name: s.user.tag,
                        iconURL: s.user.avatarURL()
                    },
                    image: {
                        url: imgs.pentagram[0]
                    }
                }
            });
            break;
        case commands.curse: 
            if (args.length != 1) break;

            const cursed = msg.mentions.members.first();

            if (args[0] !== "*") {
                if ((msg.mentions.members.first().id === members.alice || msg.mentions.members.first().id === members.shiromi) && args[0] !== "*") {

                    if ((msg.mentions.members.first().id === members.alice && msg.author.id === members.shiromi) || (msg.mentions.members.first().id === members.shiromi && msg.author.id === members.alice)) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Daughter",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, do you want to curse your sister?`
                            }
                        });
    
                        break;
                    }

                    if (msg.mentions.members.first().id === members.satan) {
                
                        if (msg.author.id === members.shiromi || msg.author.id === members.alice) {
                            msg.channel.send("", {
                                embed: {
                                    color: satan_.roles.highest.color,
                                    title: "Daughter",
                                    author: {
                                        name: satan_.nickname,
                                        iconURL: satan_.user.avatarURL()
                                    },
                                    description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, my daughter, why?`
                                }
                            });
        
                            break;
                        }
                        
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Underling",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.tag}, you don't want to do this!`
                            }
                        });
        
                        break;
                    }

                    if (msg.mentions.members.first().id === msg.author.id) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Dad",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, why do you want to do this.`
                            }
                        });

                        break;
                    }

                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: `Last Warning: ${msg.author.tag}`,
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: "How dare you lay hands on my daughters!\nEither both my daughters or I myself will curse you, underling!"
                        }
                    });
                    break;
                }

                if (msg.guild.members.cache.find(m => m.id === cursed.id).roles.highest.position > (msg.guild.members.cache.find(a => a.id === msg.author.id).roles.highest.position)) {
                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: "Curse",
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: "You can't curse someone of a higher rank than youself."
                        }
                    });
                    break;
                }
            }

            const cursing = msg.guild.roles.cache.find(r => r.id === roles.daughter).members.random();

            if (args[0] === "*") {

                let list = "";

                msg.guild.members.cache.forEach(m => {
                    if (!(m.user.id === members.alice || m.user.id === members.shiromi || m.user.id === members.satan)) {
                        let c = m;

                        list += `${(c.nickname ? c.nickname : c.user.tag)}, you've been cursed with: \n   ${curses[Math.floor(Math.random() * (curses.length - 1))]}\n`;
                    }
                });

                msg.channel.send("", {
                    embed: {
                        color: 10038562,
                        title: "Curse",
                        author: {
                            name: cursing.nickname,
                            iconURL: cursing.user.avatarURL()
                        },
                        description: list
                    }
                });

                break;
            }

            msg.channel.send("", {
                embed: {
                    color: 10038562,
                    title: "Curse",
                    author: {
                        name: cursing.nickname,
                        iconURL: cursing.user.avatarURL()
                    },
                    description: `${(cursed.nickname ? cursed.nickname : cursed.user.tag)}, you've been cursed with: \n${curses[Math.floor(Math.random() * (curses.length - 1))]}`
                }
            });
            break;
        case commands.help:
            if (msg.channel.id !== categories.hell.txtChannels.help) break;    

            let help_member = msg.guild.members.cache.find(u => u.id === members.shiromi);

            msg.delete();

            let _tmp_msg = "";

            Object.keys(help).forEach(k => {
                _tmp_msg += `·**${k}**: ${help[k]}\n`;
            });

            msg.channel.send("", {
                embed: {
                    color: 7419530,
                    title: "Help",
                    author: {
                        name: help_member.nickname,
                        iconURL: help_member.user.avatarURL()
                    },
                    description: _tmp_msg
                }
            });

            break;
        case commands.kill:

            let reaper = msg.guild.members.cache.find(u => u.id === members.reaper);

            if (args[0] == "*") {
                msg.channel.send("", {
                    embed: {
                        color: reaper.roles.cache.find(r => r.id === roles.reaper).color,
                        title: "Killed",
                        author: {
                            name: reaper.nickname,
                            iconURL: reaper.user.avatarURL()
                        },
                        description: `Everyone died. >:3`
                    }
                });
                break;
            }

            if (!(msg.guild.members.cache.find(u => u.id === msg.author.id).roles.cache.find(r => r.id === roles.reaper) || msg.guild.members.cache.find(u => u.id === msg.author.id).roles.cache.find(r => r.id === roles.gatekeeper)) || msg.channel.id === categories.castle.txtChannels.sacrifice) break;

            if (msg.mentions.members.first().id === members.satan) {
                if (msg.author.id === members.shiromi || msg.author.id === members.alice) {

                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: "Daughter",
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, my daughter, why?`
                        }
                    });

                    break;
                }
                
                msg.channel.send("", {
                    embed: {
                        color: satan_.roles.highest.color,
                        title: "Underling",
                        author: {
                            name: satan_.nickname,
                            iconURL: satan_.user.avatarURL()
                        },
                        description: `${msg.author.tag}, you don't want to do this!`
                    }
                });

                break;
            }

            if (args[0] !== "*") {


                if (msg.guild.members.cache.find(m => m.id === msg.mentions.members.first().id).roles.highest.position > (msg.guild.members.cache.find(a => a.id === msg.author.id).roles.highest.position)) {
                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: "Kill",
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: "You can't kill someone of a higher rank than youself."
                        }
                    });
                    break;
                }

                if ((msg.mentions.members.first().id === members.alice || msg.mentions.members.first().id === members.shiromi)) {

                    if ((msg.mentions.members.first().id === members.alice && msg.author.id === members.shiromi) || (msg.mentions.members.first().id === members.shiromi && msg.author.id === members.alice)) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Daughter",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, do you want to kill your sister?`
                            }
                        });
    
                        break;
                    }

                    if (msg.mentions.members.first().id === msg.author.id) {
                        msg.channel.send("", {
                            embed: {
                                color: satan_.roles.highest.color,
                                title: "Dad",
                                author: {
                                    name: satan_.nickname,
                                    iconURL: satan_.user.avatarURL()
                                },
                                description: `${msg.author.id === members.alice ? "Alice" : msg.author.id === members.shiromi ? "Shiromi" : ""}, why do you want to do this.`
                            }
                        });

                        break;
                    }

                    msg.channel.send("", {
                        embed: {
                            color: satan_.roles.highest.color,
                            title: `Last Warning: ${msg.author.tag}`,
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: "How dare you lay hands on my daughters!\nEither both my daughters or I myself will kill you, underling!"
                        }
                    });
                    break;
                }
            }


            if (msg.mentions.members.first().id === members.zozo) {
                msg.channel.send("", {
                    embed: {
                        color: reaper.roles.highest.color,
                        title: "Killed",
                        author: {
                            name: reaper.nickname,
                            iconURL: reaper.user.avatarURL()
                        },
                        description: `Your son killed you, Zozo.`
                    }
                });
                break;
            }

            if (msg.mentions.members.first().id === members.reaper) {
                msg.channel.send("", {
                    embed: {
                        color: reaper.roles.highest.color,
                        title: "Killed",
                        author: {
                            name: msg.guild.members.cache.find(u => u.id === members.zozo).nickname,
                            iconURL: msg.guild.members.cache.find(u => u.id === members.zozo).user.avatarURL()
                        },
                        description: "Your dad just killed you, Zerheart."
                    }
                });
                break;
            }
            
            if (msg.mentions.members.first().id === msg.author.id) {
                msg.channel.send("", {
                    embed: {
                        color: reaper.roles.highest.color,
                        title: "Suicide",
                        author: {
                            name: reaper.nickname,
                            iconURL: reaper.user.avatarURL()
                        },
                        description: "You commited suicide."
                    }
                });
                break;
            }

            if (args[0] != "*") {

                let kill_victim = msg.guild.members.cache.find(v => v.id === msg.mentions.members.first().id);

                let q = `INSERT INTO victims (victim_no, tag, id, date) VALUES (NULL, '${kill_victim.user.tag}', '${kill_victim.user.id}', current_timestamp())`;

                con.query(q, (err, res) => {
                    if (err) throw err;
                    
                    msg.channel.send("", {
                        embed: {
                            color: reaper.roles.cache.find(r => r.id === roles.reaper).color,
                            title: "Killed",
                            author: {
                                name: reaper.nickname,
                                iconURL: reaper.user.avatarURL()
                            },
                            description: `${kill_victim.user.tag} died. >:3`
                        }
                    });
                });

                break;
            }
            break;
        case commands.promote:

            var rs = msg.guild.roles.cache.sort((a, b) => a.position - b.position);

            var promote_user = msg.mentions.members.first();
            var promoter = msg.guild.members.cache.find(m => m.id === msg.author.id);

            var owner = msg.guild.roles.cache.find(r => r.id === roles.owner).members.random();

            if (promote_user.id === members.satan) {
                msg.channel.send("", {
                    embed: {
                        color: satan_.roles.highest.color,
                        author: {
                            name: satan_.nickname,
                            iconURL: satan_.user.avatarURL()
                        },
                        description: "Even though you tried promoting me, I can't accept it!"
                    }
                });

                break;
            }

            if (promote_user.id === promoter.id) {
                if ((promote_user.id === members.alice && promoter.id === members.shiromi) || (promote_user.id === members.shiromi && promoter.id === members.alice)) {
                    msg.channel.send("", {
                        embed: {
                            color: 7419530,
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            },
                            description: `${promoter.id === members.shiromi ? "Shiromi" : "Alice"}, why do you want to promote your sister?`
                        }
                    });

                    break;
                }
                if (promoter.id === members.shiromi || promoter.id === members.alice) {
                    msg.channel.send("My daughter, why do you want to promote yourself, you are already the highest rank.")
                    
                    break;
                }
                msg.channel.send("Nice try promoting yourself.")
            }

            if (promote_user.id === members.shiromi || promote_user.id === members.alice) {
                msg.channel.send("", {
                    embed: {
                        color: owner.roles.highest.color,
                        author: {
                            iconURL: owner.user.avatarURL()
                        },
                        description: `${(owner.id === members.shiromi && promote_user.id == members.alice) || (owner.id === members.alice && promote_user.id === members.shiromi) ? "U can't promote sis, she already owns all of u! >:3" : "Why do you want to promote me, I already own u!"}`
                    }
                })

                break;
            }

            if (promote_user.roles.highest.position === promoter.roles.highest.position) {
                msg.channel.send("", {
                    embed: {
                        color: promoter.roles.highest.color,
                        title: "Promotion rejected",
                        author: {
                            name: owner.nickname,
                            iconURL: owner.user.avatarURL()
                        },
                        description: `You can't promote ${promote_user.user.tag} anymore, they reached your rank.`
                    }
                });
                break;
            }
            if (promote_user.roles.cache.find(r => r.id === roles.reaper)) {
                msg.channel.send("", {
                    embed: {
                        color: promoter.roles.highest.color,
                        title: "Promotion rejected",
                        author: {
                            name: owner.nickname,
                            iconURL: owner.user.avatarURL()
                        },
                        description: `Promotion rejected, reason: ${promote_user.user.tag} already has reached the role of \`Reaper\``
                    }
                });
                break;
            }

            var next_role = rs.find(r => r.position === (promote_user.roles.highest.position + 1))

            promote_user.roles.add(next_role);

            msg.channel.send("", {
                embed: {
                    color: owner.roles.highest.color,
                    title: "Promotion success",
                    author: {
                        name: owner.nickname,
                        iconURL: owner.user.avatarURL()
                    },
                    description: `Successfully promoted ${promote_user.user.tag} to \`${next_role.name}\``
                }
            })
            break;

        case commands.demote:

            var rs = msg.guild.roles.cache.sort((a, b) => a.position - b.position);
            
            var owner = msg.guild.roles.cache.find(r => r.id === roles.owner).members.random();

            var demote_user = msg.mentions.members.first();
            var demoter = msg.guild.members.cache.find(m => m.id === msg.author.id);

            var prev_role = rs.find(r => r.id === demote_user.roles.highest.id);

            var user_tag = demote_user.user.tag;

            if (demote_user.id === members.satan) {
                msg.channel.send("", {
                    embed: {
                        color: demote_user.roles.highest.color,
                        author: {
                            name: satan_.nickname,
                            iconURL: satan_.user.avatarURL()
                        },
                        title: "Warning",
                        description: "You dare to demote me...!"
                    }
                });

                break;
            }

            if (demote_user.id === demoter.id) {
                if ((demote_user.id === members.alice && demoter.id === members.shiromi) || (demote_user.id === members.shiromi && demoter.id === members.alice)) {
                    msg.channel.send("", {
                        embed: {
                            color: 7419530,
                            author: {
                                name: satan_.nickname,
                                iconURL: satan_.user.avatarURL()
                            }
                        },
                        description: `${promoter.id === members.shiromi ? "Shiromi" : "Alice"}, why do you want to demote your sister?`
                    });

                    break;
                }
                if (demote_user.id === members.shiromi || demote_user.id === members.alice) {
                    msg.channel.send("Why do you want to demote yourself?");
                    break;
                }
                msg.channel.send("Never saw a more submissive underling, trying to demote itself.");
            }

            if (demote_user.id === members.shiromi || demote_user.id === members.alice) {
                msg.channel.send("", {
                    embed: {
                        color: owner.roles.highest.color,
                        author: {
                            name: owner.nickname,
                            iconURL: owner.user.avatarURL()
                        },
                        description: `${(owner.id === members.shiromi && demote_user.id == members.alice) || (owner.id === members.alice && demote_user.id === members.shiromi) ? "Trying to demote sis, I'll get rid of u! >:3" : "Thinking you can demote me?"}`
                    }
                });

                break;
            }

            if (demote_user.roles.highest.id === roles.underlings) {
                msg.channel.send("", {
                    embed: {
                        color: demoter.roles.highest.color,
                        title: "Demotion rejected",
                        author: {
                            name: owner.nickname,
                            iconURL: owner.user.avatarURL()
                        },
                        description: `Demotion rejected, reason: ${user_tag} has already reached the role \`Underling\``
                    }
                });
                break;
            }

            demote_user.roles.remove(prev_role);

            msg.channel.send("", {
                embed: {
                    color: owner.roles.highest.color,
                    title: "Demotion success",
                    author: {
                        name: owner.nickname,
                        iconURL: owner.user.avatarURL()
                    },
                    description: `Successfully demoted ${user_tag} from \`${prev_role.name}\``
                }
            });
            
            break;

        case commands.game:
            msg.channel.send("Sorry, this command is currently under construction.");

            break;

        default:
            if (msg.author.id === members.alice || msg.author.id === members.shiromi) break;
            msg.channel.send("This is not a command.");
    }
});

Satan.on("disconnect", () => {
    Satan.login(token);
})

Satan.login(token);

<template>
  <v-container fluid>
    <v-row>
      <v-col
        ><v-btn
          block
          v-if="ws_disconnected"
          color="green"
          height="50"
          v-on:click="ws_connect"
          >Connecter</v-btn
        ></v-col
      >
      <v-col>
        <v-btn 
          href="http://192.168.1.49:2222/#nas" 
          block
          text
          height="50"
          >
          <v-icon size=30>mdi-trackpad</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_reset"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_playlist"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-playlist-play</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_osd"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-information-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_ctxmenu"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-menu</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_refresh_library"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_previous"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-skip-previous-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_subtitle"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-subtitles-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_language"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-account-music-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="50"
          v-on:click="press_next"
          :disabled="ws_disconnected"
        >
          <v-icon size=30>mdi-skip-next-outline</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <v-row>
      <v-col>
        <v-btn
          block
          text
          height="100"
          v-on:click="press_stop"
          :disabled="ws_disconnected"
        >
          <v-icon size=40>mdi-stop</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          outlined
          height="100"
          v-on:click="press_up"
          :disabled="ws_disconnected"
        >
          <v-icon size=50>mdi-chevron-up</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="100"
          v-on:click="press_play"
          :disabled="ws_disconnected"
        >
          <v-icon size=40>mdi-play</v-icon>
        </v-btn>
        
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn
          block
          outlined
          dark
          height="100"
          v-on:click="press_left"
          :disabled="ws_disconnected"
        >
          <v-icon size=50>mdi-chevron-left</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          outlined
          height="100"
          v-on:click="press_enter"
          :disabled="ws_disconnected"
        >
          <v-icon size=40>mdi-check-bold</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          outlined
          height="100"
          v-on:click="press_right"
          :disabled="ws_disconnected"
        >
          <v-icon size=50>mdi-chevron-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          block
          text
          height="100"
          v-on:click="press_pause"
          :disabled="ws_disconnected"
        >
          <v-icon size=40>mdi-pause</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          outlined
          height="100"
          v-on:click="press_down"
          :disabled="ws_disconnected"
        >
          <v-icon size=50>mdi-chevron-down</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          block
          text
          height="100"
          v-on:click="press_back"
          :disabled="ws_disconnected"
        >
          <v-icon size=40>mdi-subdirectory-arrow-left</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ws_disconnected: false,
    };
  },
  created() {
    this.$options.sockets.onopen = (data) => this.on_ws_opened(data);
    this.$options.sockets.onclose = (data) => this.on_ws_closed(data);
  },
  methods: {
    ws_connect() {
      location.reload();
    },
    on_ws_opened() {
      console.log("connected");
      this.ws_disconnected = false;
    },
    on_ws_closed() {
      console.log("disconnected");
      this.ws_disconnected = true;
    },
    press_enter() {
      this.$socket.sendObj({ button: "press_enter" });
    },
    press_right() {
      this.$socket.sendObj({ button: "press_right" });
    },
    press_left() {
      this.$socket.sendObj({ button: "press_left" });
    },
    press_up() {
      this.$socket.sendObj({ button: "press_up" });
    },
    press_down() {
      this.$socket.sendObj({ button: "press_down" });
    },
    press_play() {
      this.$socket.sendObj({ button: "press_play" });
    },
    press_pause() {
      this.$socket.sendObj({ button: "press_pause" });
    },
    press_stop() {
      this.$socket.sendObj({ button: "press_stop" });
    },
    press_back() {
      this.$socket.sendObj({ button: "press_back" });
    },
    press_next() {
      this.$socket.sendObj({ button: "press_next" });
    },
    press_previous() {
      this.$socket.sendObj({ button: "press_previous" });
    },
    press_playlist() {
      this.$socket.sendObj({ button: "press_playlist" });
    },
    press_subtitle() {
      this.$socket.sendObj({ button: "press_subtitle" });
    },
    press_language() {
      this.$socket.sendObj({ button: "press_language" });
    },
    press_reset() {
      this.$socket.sendObj({ button: "press_reset" });
    },
    press_logoff() {
      this.$socket.sendObj({ button: "press_logoff" });
    },
    press_osd() {
      this.$socket.sendObj({ button: "press_osd" });
    },
    press_ctxmenu() {
      this.$socket.sendObj({ button: "press_ctxmenu" });
    },
  },
};
</script>

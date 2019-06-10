<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link to="/" class="navbar-brand">Stock Trader</router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="nav navbar-nav">
        <router-link to="/portfolio" activeClass="active" tag="li">
          <a>Portfolio</a>
        </router-link>
        <!-- doesn't register as an a tag, registers as a li tag -->
        <router-link to="/stocks" activeClass="active" tag="li">
          <a>Stocks</a>
        </router-link>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Save & Load
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a class="dropdown-item" href="#">Save Data</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Load Data</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>
